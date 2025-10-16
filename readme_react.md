### Set up node

Install the dependencies from `package.json`
```
> npm install
```

In case of problems, some of the following might be helpful:
```
> npm audit
> npm outdated
> npm install <pkg@latest>
> npm update
```

### Using npm commands

`npm` commands can be run with:
```
> npm run <cmd>
```

To see list of available commands:
```
> npm run
```

### Run the page in develop mode

```js
> npm run dev
```

### Build the page and preview it

```
> npm run build
> npm run preview
```
The page will be built in the `dist` directory.

### Validate papers schema

After updating the `papers.yaml`, validate against the papers schema by running the `check_yaml_validity.py` script in the `validation` directory.

### Deploy webpage

The project is set up to deploy to `kennyweiss.com` through a github-actions CI plan, which builds the page into the `gh-pages` branch.

### Cleaning the project

In case there are problems, it mighe be helpful remove some node artifacts, e.g. in the `node_modules` directory and the `package-lock.json`, or the built webpage in the `dist` directory and rebuild.
