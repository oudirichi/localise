import Extension from './extension';
import JsonExtension from './json-extension';

export default function(ext: string): Extension {
  const mapped: { [key: string]: Extension } = {
    'json': JsonExtension,
  };

  if (ext in mapped) return mapped[ext];
  return Extension;
}
