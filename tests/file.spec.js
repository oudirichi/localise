import { expect, it, describe, beforeEach, vi  } from "vitest";
import { createDir } from "../src/utils/file";
import fs from 'fs';

let mkdirSyncFn;
describe('createDir', () => {
  beforeEach(() => {
    mkdirSyncFn = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      // new implementation
    });
  });

  it("should create the file sync with the given path", async () => {
    const path = 'any/path';
    createDir(path);
    expect(mkdirSyncFn).toHaveBeenCalledWith(path, { recursive: true });
  });
});

