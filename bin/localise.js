#!/usr/bin/env node

const program = require('commander');
const Localise = require('../src/index');

program
  .name("localise")
  .version('1.0.0');

  program
  .command('import')
  .description('import translations')
  .option("-k, --key <key>", "localise key, can be provided as env variable LOCALISE_KEY")
  .option("-d, --dest <dest>", `The dest path for the assets, You have access to "locale" and "ext" as variable. Ex: --dest 'dest/\${locale}.\${ext}'`)
  .option("-c, --clean", 'clean the folder dest')
  .option("-m, --minify", "Minify assets when possible")
  .option("-e, --ext <ext>", "The extension you want to fetch. Supported: yaml, json")
  .option("-b, --bundled", "Bundle all assets together when possible")
  .option("-i, --index <index>", 'Override default lookup key for the file format: "id", "text" or a custom alias')
  .option("-s, --source <source>", "Specify alternative source locale instead of project default")
  .option("-o, --order <order>", "Export translations according to asset order (created | id)")
  .option("-f, --filter <filter>", 'Filter assets by comma-separated tag names. Match any tag with * and negate tags by prefixing with !')
  .option("--format <format>", 'More specific format of file type')
  .option("--status <status>", 'Export translations with a specific status or flag. Negate values by prefixing with !. e.g. "translated", or "!fuzzy"')

  .action(function (options) {
    Localise.import(options);
  });

program
  .command('extract')
  .description('extract translations')
  .option("-e, --ext <ext>", "The extension you want to extract")
  .option("-f, --file <dest>", 'The file to extract assets')
  .option("-k, --key <key>", "localise key, can be provided as env variable LOCALISE_KEY")
  .option("-a, --async", "Specify that import should be done asynchronously (recommended for large files)")
  .option("-i, --ignore-existing", "Specify that existing assets encountered in the file will NOT be updated")
  .option("-t, --tag-new <tagNew>", "Tag any NEW assets added during the import with the given tags (comma separated)")
  .action(function (options) {
    Localise.extract(options);
  });

program.parse(process.argv);
