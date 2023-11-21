import { BunFile } from 'bun';
import os from 'node:os';

const networkInterfaces = os.networkInterfaces();
const { en0 } = networkInterfaces;

if (en0) {
  const ipv4 = en0.find((ip) => ip.family === 'IPv4');

  if (ipv4) {
    const envFile = Bun.file('./.env.local');
    const envFileExists = await envFile.exists();

    const envSampleFile = Bun.file('./.env.local.sample');
    const envSampleFileExists = await envSampleFile.exists();

    let file: BunFile;

    if (envFileExists) {
      file = envFile;
    } else if (envSampleFileExists) {
      file = envSampleFile;
    } else {
      console.error('No .env.local or .env.local.sample file found.');

      process.exit(1);
    }

    const fileContent = await file.text();
    const [firstRow, ...rows] = fileContent.split('\n');

    const newFirstRow = `HOST="${ipv4.address}" # auto-detected`;

    if (firstRow.startsWith('HOST=')) {
      await Bun.write('./.env.local', [newFirstRow, ...rows].join('\n'));
      console.log('Updated .env.local file with auto-detected IP address.');

      process.exit(0);
    }

    await Bun.write(
      './.env.local',
      [newFirstRow, firstRow, ...rows].join('\n'),
    );
    console.log('Updated .env.local file with auto-detected IP address.');

    process.exit(0);
  }
}
