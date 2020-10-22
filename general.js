addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const data = [
        {
            'name': 'Cloudflare',
            'url': 'https://www.cloudflare.com/'
        },
        {
            'name': 'NYTimes',
            'url': 'https://www.nytimes.com/'
        },
        {
            'name': 'Amazon',
            'url': 'https://www.amazon.com/'
        }
    ]
    if (new URL(request.url).pathname == '/links') {
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json charset=UTF-8'
            }
        })
    }
    const addLinks = {
        element: (e) => {
            data.forEach(d => {
                e.append('<a href="' + d.url + '">' + d.name + '</a>', { html: true })
            })
        }
    }
    const showProfile = {
        element: (e) => {
            e.removeAttribute('style')
        }
    }
    const setAvatar = {
        element: (e) => {
            e.setAttribute('src', 'https://www.pinclipart.com/picdir/big/76-766485_wolfmealprep-instagram-profile-pictures-circle-clipart.png')
        }
    }
    const setName = {
        element: (e) => {
            e.setInnerContent('Devan Patel')
        }
    }
    const showSocial = {
        element: (e) => {
            e.removeAttribute('style')
            e.append('<a href="https://www.linkedin.com"><svg><image xlink:href="https://simpleicons.org/icons/linkedin.svg" width="40" height="40"/></svg></a>', { html: true })
        }
    }
    const updateTitle = {
        element: (e) => {
            e.setInnerContent('Devan Patel')
        }
    }
    const updateBackground = {
        element: (e) => {
            e.setAttribute('style', 'background-color:grey')
        }
    }
    rewriter = new HTMLRewriter()
        .on('div[id="links"]', addLinks)
        .on('div[id="profile"]', showProfile)
        .on('img[id="avatar"]', setAvatar)
        .on('h1[id="name"]', setName)
        .on('div[id="social"]', showSocial)
        .on('title', updateTitle)
        .on('body', updateBackground)
    response = rewriter.transform(await fetch('https://static-links-page.signalnerve.workers.dev'))
    return response
}