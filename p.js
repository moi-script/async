import path from 'path';

// URL
// path

// The main branches of path

// root ->  can be substitute, '/', '/something'
// dir -> /path/path/path
// base -> /path/path/base 
// name -> /path/path/file.txt -> name = file
// ext -> /path/path/file.txt -> ext = .ext


// base name, this is the last name in the links
path.basename('/foo/bar/baz/asdf/quux.html'); // -> quux.html

// path.basename(path[, suffix]) -> suffix is optional to wnat to things to remove
path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // quux 

// console.log(process.env.PATH);
// Prints: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

// Using path delimiter
process.env.PATH.split(path.delimiter); // ->  ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\'] 



// External name 

path.extname // -> index.html = .html,
             //  index.coffee.md = .md,
             //  index. = .,
             // index = ''
             // .index = ''
             // .index.md = .md 


// path.format(pathObject) // -> returns an organize string 

// const pathObject = {
//     dir : '',
//     root : '',
//     base : '',
//     name : '',
//     ext : '',

// }

// console.log(path.format({
//     dir : '/account/user',
//     root : '/', // this will be use if there is no dir
//     base : 'new.txt'
// })) // /account/user/new.txt



// If `dir`, `root` and `base` are provided,
// `${dir}${path.sep}${base}`
// will be returned. `root` is ignored.
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt',
}); // -> '/home/user/dir/file.txt'


// `root` will be used if `dir` is not specified.
// If only `root` is provided or `dir` is equal to `root` then the
// platform separator will not be included. `ext` will be ignored.
path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored',
});  // '/file.txt'


// `name` + `ext` will be used if `base` is not specified.
path.format({
  root: '/',
  name: 'file',
  ext: '.txt',
}); // Returns: '/file.txt'

// The dot will be added if it is not specified in `ext`.
path.format({
  root: '/',
  name: 'file',
  ext: 'txt',
}); //  '/file.txt' 


path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // it concatenates parameters, the last '..' part is to remove the last
// console.log(path.join('/foo', 'bar', 'baz', '..')) 


// path.parse(path) // returns an object form base, root, dir, name, ext

// ┌─────────────────────┬────────────┐
// │          dir        │    base    │
// ├──────┬              ├──────┬─────┤
// │ root │              │ name │ ext │
// "  /    home/user/dir / file  .txt "
// └──────┴──────
// ────────┴──────┴─────┘

// (All spaces in the "" line should be ignored. They are purely for formatting.) 

// console.log(path.parse('C:/local/new/path/acc/file.txt'));

// {
//   root: 'C:/',
//   dir: 'C:/local/new/path/acc',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }


// path.sep // a '/' in window separator, 

// console.log(path.parse(path.basename('/hello/new.txt')).name);



