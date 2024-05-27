FROM postgres:16-alpine

# RUN addgroup --system --gid 1002 postgres
# RUN adduser --system --uid 1002 postgres

RUN chown postgres:postgres /var/lib/postgresql

USER postgres

EXPOSE 5432