set -e

cd ui
# npm run build
npm start
cd ../
go build
./gotron-react-boilerplate 