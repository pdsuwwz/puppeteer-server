rsync -avr \
.env \
__test__ \
dist \
static \
ecosystem.config.js \
package.json \
pnpm-lock.yaml \
my-company@172.20.30.41:/home/my-company/pdsuwwz-test/.

# chmod u+x sync.sh
# my-company@172.20.30.41 is your ssh path.
# /home/my-company/pdsuwwz-test/. is your remote directory.
