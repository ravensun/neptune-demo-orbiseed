docker stop neptuneapi
docker rm neptuneapi
docker build -t neptuneapi .
docker run -d --name neptuneapi -p 80:4000 neptuneapi