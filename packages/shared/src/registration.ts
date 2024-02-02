import { z } from 'zod';

// Interface hobby state
export interface HobbyBody {
  category_name: string;
  logo_path: string;
  hobbies: [
    {
      hobby_id: number;
      hobby_name: string;
    },
  ];
}

// Schema validation for hobbies
export const hobbySchema = z
  .array(z.string(), { invalid_type_error: 'ⓘ Select at least one hobby.' })
  .nonempty({ message: 'ⓘ Select at least one hobby.' });

// Type of hobby schema
export type HobbySchemaBody = z.infer<typeof hobbySchema>;
