const url = new URL('https://user:pass@sub.example.com:8080/path/page.html?search=query#section1');



// URL {
//   href: 'https://user:pass@sub.example.com:8080/path/page.html?search=query#section1',
//   origin: 'https://sub.example.com:8080',
//   protocol: 'https:',
//   username: 'user',
//   password: 'pass',
//   host: 'sub.example.com:8080',
//   hostname: 'sub.example.com',
//   port: '8080',
//   pathname: '/path/page.html',
//   search: '?search=query',
//   searchParams: URLSearchParams { 'search' => 'query' },
//   hash: '#section1'
// }




// #section1 -> hash
// sub.example.com:8080 -> host
// sub.example.com -> hostname
// https://user:pass@sub.example.com:8080/path/page.html?search=query#section1 -> href
// https://sub.example.com:8080 -> origin
// pass -> password
// /path/page.html -> pathname
// 8080 -> port
// https: -> protocol
// true
// ?search=query -> search
// query -> searchParams.get('search')
// user -> username
// https://user:pass@sub.example.com:8080/path/page.html?search=query#section1 -> toString()
// https://user:pass@sub.example.com:8080/path/page.html?search=query#section1 -> toJSON()


