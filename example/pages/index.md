<div>

# @webboot/cli

this is the [@webboot](https://github.com/webboot/)/cli package.

<GitBadges>@webboot/cli</GitBadges>

developers of uniquely adressable resources
can use this cli to register pages for verification by the @webboot service.

## install

```
// globally installed cli
npm install -g @webboot/cli

// locally in your app
npm install --save-dev --save-exact @webboot/cli
```

## usage

after installing globally, `webboot` will be available as an executable on the PATH.

if installed as local app npm dependency, `webboot`
will be available in package.json npm run scripts,
and installed in node_modules/.bin/webboot.

## #usage- cli

./docs is the default directory to build hashes for.

## #cli- all

run all tasks, one after the other. your page will be published after this.

`webboot all --dir docs -u git-user`

## #cli- generate

generate sri-hashes.json

`webboot generate --dir docs -u git-user`

## #usage-cli- verify

verify sri-hashes.json

`webboot verify --dir docs -u git-user`

## #usage-cli- sign

sign sri-hashes.json

`webboot sign --dir docs -u git-user`

## #cli- release

release sri-hashes.json to the webboot network

`webboot release --dir docs -u git-user`

</div>
