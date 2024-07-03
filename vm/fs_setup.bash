APP_PATH="/home/projects/"
GITHUB_REPO="https://github.com/vittxr/file_to_text"
PROJECT_NAME="file_to_text"

if [ ! -d "$APP_PATH" ]; then
    mkdir -p "$APP_PATH"
fi

cd "$APP_PATH"
git clone "$GITHUB_REPO"

cd "$PROJECT_NAME"

rm -rf vm/
