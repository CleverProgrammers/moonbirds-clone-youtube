# Upload to Infura IPFS using your Terminal

1. Create a variable of your Infura Credentials
   `infuraAuth="YOUR_PROJECT_ID:YOUR_API_KEY"`

2. Update the file name to file you want to upload
   `curl -X POST -u $infuraAuth "https://ipfs.infura.io:5001/api/v0/add" -F @file=@filename.jpg`

> The response will be something like this:
> {"Name":"filename.jpg","Hash":"QmNfqKHeY8nduBGEs1yJXTHafruJ65E5ms8VMEdaz4wkPN","Size":"1017312"}

3. Copy the "Hash" and paste it in the link below to ARG
   `curl -X POST -u $infuraAuth "https://ipfs.infura.io:5001/api/v0/pin/add?arg=/ipfs/...HASH..."`

4. Create a JSON file for the image with the below data

   ```
   {
      "name": "NFT Title",
      "description": "NFT Description",
      "image": "http://YOUR_SUBDOMAIN.infura-ipfs.io/ipfs/ RESPONSE_FROM_PREVIOUS_STEP"
   }
   ```

5. Repeat Step 2 and 3 with the JSON file and that's your NFT metadata
