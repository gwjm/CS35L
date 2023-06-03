import os
import zlib

class CommitNode:
    def __init__(self, commit_hash):
        """
        :type commit_hash: str
        """
        self.commit_hash = commit_hash
        self.parents = set()
        self.children = set()

path = os.getcwd()

# print(os.listdir(path))
# print(path)
# print(os.path.isdir(path))
# print(os.path.dirname(path))

while(os.path.isdir(path + '/.git') == False):
    path = os.path.dirname(path)

heads  = os.listdir(path + '/.git/refs/heads/') # list of heads

# loop through all heads and get their commit hash
hashes = []
for head in heads:
    with open(path + '/.git/refs/heads/' + head, 'r') as f:
        hash = f.readline().rstrip("\n")
        hashes += [hash]
        print(f'{head}: {hash}')
        f.close()

# loop through all commits and get their parents
parents = {}
for hash in hashes:
    with open(path + '/.git/objects/' + f"{hash[:2]}/{hash[2:]}", 'rb') as f:
        data = f.read()
        decompressed_data = zlib.decompress(data).decode('utf-8')
        for line in decompressed_data.splitlines():
            if line.startswith('parent'):
                parents[hash] = line.split(' ')[1]
                print(f'{hash}: {parents[hash]}')

# decompress the commit
