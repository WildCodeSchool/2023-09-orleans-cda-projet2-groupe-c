import type {
  KyselyPlugin,
  PluginTransformQueryArgs,
  PluginTransformResultArgs,
  QueryResult,
  RootOperationNode,
  UnknownRow,
} from 'kysely';

type SomeObject = {
  [key: string]: unknown;
};

function processPoint(value: SomeObject) {
  try {
    if (value.type === 'Point' && Array.isArray(value.coordinates)) {
      const [x, y] = value.coordinates as [number, number];
      return { x, y };
    }

    if (typeof value === 'object') {
      for (const key of Object.keys(value)) {
        value[key] = processPoint(value[key] as SomeObject);
      }
      return value;
    }
  } catch {
    return;
  }

  return value;
}

function processRows(unknownRows: UnknownRow[]) {
  for (const unknownRow of unknownRows) {
    for (const key of Object.keys(unknownRow)) {
      unknownRow[key] = processPoint(unknownRow[key] as SomeObject);
    }
  }
}

/**
 * This plugin converts weird Kysely point objects to normal objects.
 * ```ts
 * // Before:
 * {
 *   type: "Point",
 *   coordinates: [1, 2],
 * }
 *
 * // After:
 * {
 *   x: 1,
 *   y: 2,
 * }
 * ```
 *
 * Usage:
 * ```ts
 * const db = new Kysely<Database>({
 *   dialect,
 *   plugins: [
 *    // other plugins
 *    new PointPlugin(),
 *   ],
 * });
 * ```
 */
export class PointPlugin implements KyselyPlugin {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
    return args.node;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async transformResult(
    // eslint-disable-next-line unicorn/prevent-abbreviations
    args: PluginTransformResultArgs,
  ): Promise<QueryResult<UnknownRow>> {
    try {
      const { result } = args;
      const { rows } = result;

      processRows(rows);

      return result;
    } catch {
      throw new Error('Error transforming result');
    }
  }
}
