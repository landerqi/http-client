# 从 package.json 中获取版本
version=$(node -p "const { version } = require('./package.json'); version")

git checkout master

# 测试
# yarn test

# 构建
yarn build

# 提交
git add -A
standard-version --commit-all --release-as $version
git push --tags origin master

# 推送
npm publish --registry=https://registry.npmjs.org
