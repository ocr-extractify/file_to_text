$APP_PATH="/home/projects/files_to_text/"
$GITHUB_REPO="https://github.com/vittxr/files_to_text"

if [ -z $APP_PATH ]; then
    mkdir -p $APP_PATH
fi

cd $APP_PATH
git clone $GITHUB_REPO

rm -rf vm/ 

