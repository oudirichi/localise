export default class Extension {
  static parse(response: string): any {
    return response;
  }

  static formatText({ data }: { data: string, minify: boolean }) : string {
    return data;
  }
}
