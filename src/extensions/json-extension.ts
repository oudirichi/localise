import Extension from './extension'

export default class JsonExtension extends Extension {
  static parse(response: string): { [name: string]: string } {
    return JSON.parse(response);
  }

  static formatText({ data, minify }: { data: string, minify: boolean }) : string {
    const jsonIndent = 2;
    const jsonCompressIndent = 0;
    return JSON.stringify(data, null, minify ? jsonCompressIndent : jsonIndent);
  }
}
