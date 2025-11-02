function iterate(index) {

    if (index === links.length) { return cb() }
    
    spider(links[index], nesting - 1, function (err) {
        if (err) { return cb(err) } iterate(index + 1)
    })
}


iterate(0)