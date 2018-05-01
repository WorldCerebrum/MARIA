FROM ipfs/go-ipfs:latest
COPY scripts /usr/local/bin/
EXPOSE 4001 5001 8080
ENV IPFS_PATH /data/ipfs
RUN mkdir -p "$IPFS_PATH" && chown -R ipfs "$IPFS_PATH" && chmod 777 "$IPFS_PATH" 
#VOLUME /data/ipfs
RUN ["chmod", "+x", "/usr/local/bin/start_ipfs.sh"]
ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/start_ipfs.sh"]
# Execute the daemon subcommand by default
CMD ["daemon", "--migrate=true"]