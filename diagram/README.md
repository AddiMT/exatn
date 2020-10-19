 # EXaTN Theia Diagram Editor
 
 A theia IDE that supports diagram display and editing for ExaTN in browser



## Dependencies

Install [nvm](https://github.com/creationix/nvm#install-script).


```bash
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
```

Install npm and node.

```bash
    nvm install 10
    nvm use 10
```

Install yarn.

```bash
    npm install -g yarn
```


## Clone


## Build/Run Instructions

To build the digram server, 
```bash
cd language-server
./gradlew build
```

To build the theia front

```bash
cd ../theia
yarn
```

## Run the browser app
```bash
cd browser-app
yarn start
```
and point your browser to `localhost:3000`.

