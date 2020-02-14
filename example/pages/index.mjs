export const View = state =>
  div([
    h1('@webboot/cli'),
    p(['this is the ', Link({ to: 'https://github.com/webboot/' }, '@webboot/cli'), ' package.']),

    GitBadges('webboot/cli'),

    p([
      'developers of uniquely adressable resources',
      ' can use this cli to register pages for verification by the @webboot service.',
    ]),

    h2({ id: 'install' }, 'install'),

    Pre(`
// globally installed cli
npm install -g @webboot/cli

// locally in your app
npm install --save-dev --save-exact @webboot/cli
`),

    h2({ id: 'usage' }, 'usage'),
    p('after installing globally, `webboot` will be available as an executable on the PATH.'),

    p([
      'if installed as local app npm dependency, `webboot`',
      ' will be available in package.json npm run scripts,',
      ' and installed in node_modules/.bin/webboot.',
    ]),

    h2({ id: 'usage-cli' }, 'cli'),

    p('./docs is the default directory to build hashes for.'),

    h2({ id: 'cli-all' }, 'all'),
    p('run all tasks, one after the other. your page will be published after this.'),
    Pre(`
webboot all --dir docs -u git-user
`),

    h2({ id: 'cli-generate' }, 'generate'),
    p('generate sri-hashes.json'),
    Pre(`
webboot generate --dir docs -u git-user
`),

    h2({ id: 'usage-cli-verify' }, 'verify'),
    p('verify sri-hashes.json'),
    Pre(`
webboot verify --dir docs -u git-user
`),

    h2({ id: 'usage-cli-sign' }, 'sign'),
    p('sign sri-hashes.json'),
    Pre(`
webboot sign --dir docs -u git-user
`),

    h2({ id: 'cli-release' }, 'release'),
    p('release sri-hashes.json to the webboot network'),
    Pre(`
webboot release --dir docs -u git-user
`),
  ])
