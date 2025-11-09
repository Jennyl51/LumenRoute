# LumenRoute

##Set up instructions
1. Download the data files from City of Berkeley Police Deparment Data Portal: https://bpd-transparency-initiative-berkeleypd.hub.arcgis.com/search or from the Data.zip shared in #lumenroute Slack Channel

2. Move the Data.zip to LumenRoute directory, and unzip the Data.zip

3. Make sure the datasets and csv file's names are matching with the shared code, please revise the name of the files on your local laptop instead of modifying the written code.

4. Never add or push the data file to github repository. Same for .env file which stores the API keys.
    - please add the file name to .gitignore before you push to github.

5. Move the Data folder under assests/, your directories should look like
```
LumenRoute/
        .expo/
        .vscode/
        app/
        assets/
            Data/ <-- moved to here, should be in gray color as it's untracked
            dummie-data/
            images/
        components/
        ...
        ...

```
    
    

## Packages Install
1. Run "npm install" to install node_modules at the main directory

2. Run "npx expo start" to checkout the app!
    - Press "w" for website view
    - Download "EXPO GO" mobile app and Scan the QR with camera for mock mobile app view

3. Create .env file
    - Add personal API KEYs to the .env file, including:
    ```
        - EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        - GOOGLE_IOS_CLIENT_ID
        - GOOGLE_ANDROID_CLIENT_ID
    ```


## Large Files

1. Download git command for large files:
```
    $ brew install git-lfs
    $ git lfs install <-- enable lfs
    $git lfs track "*.csv"
    $git rm --cached '*.csv'
```

2. Run this to enable larger push:
```
    git config http.postBuffer 524288000
    git config http.maxRequests 100
    git config pack.windowMemory "100m"
    git config pack.packSizeLimit "100m"
```

