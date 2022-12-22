# Local reporting setup

## Start local Grafana
```bash
docker run -d -p 3000:3000 --name grafana grafana/grafana:7.5.0
```

# SSH in to instance

```bash
docker exec -it grafana /bin/bash
```

## Install Json plugin for grafana

```bash
grafana-cli plugins install simpod-json-datasource
```
## Restart Container

```bash
exit
docker restart grafana
```

## Setup local data API using Dev nginx

[update nginx config](nginx-conf.yaml) and setup locally

```bash
dev-nginx setup-app nginx-conf.yaml
```

