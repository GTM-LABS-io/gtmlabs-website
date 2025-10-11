Add lead to contact list and campaign​#Copy link
Body
required
application/json
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
list_id
Type:string
required
campaign_id
Type:string
required
data
Type:array object[]
Show Child Attributesfor data
Responses

200
Lead successfully added to contacts list and campaign

Type:SuccessResponse
message
Type:string
Example
application/json

400
Bad request

Type:ErrorResponse
message
Type:string
Example
application/json

401
Unauthorized - Invalid API key

application/json

403
Forbidden - API key issue or contact already in workspace

application/json

404
List or campaign not found

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "api_key": "",
  "linkedin_url": "",
  "list_id": "",
  "campaign_id": "",
  "data": [
    {
      "property": "",
      "value": ""
    }
  ]
}'

Test Request
(post /api/v1/leads)
Status:200
Status:400
Status:401
Status:403
Status:404
Status:500

Copy content
{
  "message": "success"
}
Lead successfully added to contacts list and campaign

Send message to LinkedIn profile​#Copy link
Body
required
application/json
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
sender
Type:string
Format:uri
required
message
Type:string
required
Responses

200
Message successfully sent

application/json

400
Bad request

application/json

401
Unauthorized - Invalid API key or authentication expired

application/json

403
Forbidden - Invalid API key or no permission to message the user

application/json

404
Account not found

application/json

422
Unprocessable entity - missing required field

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads/send-message
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads/send-message \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "api_key": "",
  "linkedin_url": "",
  "sender": "",
  "message": ""
}'

Test Request
(post /api/v1/leads/send-message)
Status:200
Status:400
Status:401
Status:403
Status:404
Status:422
Status:500

Copy content
{
  "message": "success"
}
Message successfully sent

Send voice message to LinkedIn profile​#Copy link
Body
required
application/json
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
sender
Type:string
Format:uri
required
message
Type:string
required
Responses

200
Voice message successfully sent

application/json

400
Bad request

application/json

401
Unauthorized - Invalid API key or authentication expired

application/json

403
Forbidden - Invalid API key or no permission to message the user or voice not trained

application/json

404
Account not found

application/json

422
Unprocessable entity - missing required field

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads/send-voice
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads/send-voice \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "api_key": "",
  "linkedin_url": "",
  "sender": "",
  "message": ""
}'

Test Request
(post /api/v1/leads/send-voice)
Status:200
Status:400
Status:401
Status:403
Status:404
Status:422
Status:500

Copy content
{
  "message": "success"
}
Voice message successfully sent

Get conversation from LinkedIn using lead's URL​#Copy link
Body
required
application/json
api_key
Type:string
required
API key for authentication

linkedin_url
Type:string
required
LinkedIn profile URL of the lead

sender
Type:string
required
Identifier or email of the sender

is_sale_nav
Type:boolean
Indicates if Sales Navigator is being used (optional)

Responses

200
Conversation successfully retrieved from LinkedIn

application/json

400
Bad request - Missing or invalid parameters

application/json

401
Unauthorized - Invalid API key

application/json

403
Forbidden - Access to conversation data is not allowed

application/json

404
Conversation or LinkedIn profile not found

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads/conversation
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads/conversation \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "api_key": "",
  "linkedin_url": "",
  "sender": "",
  "is_sale_nav": true
}'

Test Request
(post /api/v1/leads/conversation)
Status:200
Status:400
Status:401
Status:403
Status:404
Status:500

Copy content
{
  "message": "success"
}
Conversation successfully retrieved from LinkedIn

Add lead to contact list​#Copy link
Body
required
application/json
apiKey
Type:string
required
linkedinUrl
Type:string
Format:uri
required
list_id
Type:string
required
data
Type:array object[]
Show Child Attributesfor data
Responses

200
Lead successfully added to contacts list

application/json

400
Bad request

application/json

401
Unauthorized - Invalid API key

application/json

403
Forbidden - API key issue or contact already in workspace

application/json

404
List not found

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads/contact
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads/contact \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "apiKey": "",
  "linkedinUrl": "",
  "list_id": "",
  "data": [
    {
      "property": "",
      "value": ""
    }
  ]
}'

Test Request
(post /api/v1/leads/contact)
Status:200
Status:400
Status:401
Status:403
Status:404
Status:500

Copy content
{
  "message": "success"
}
Lead successfully added to contacts list

Add existing lead to campaign​#Copy link
Body
required
application/json
api_key
Type:string
required
linkedin_url
Type:string
required
campaign_id
Type:string
required
Responses

200
Lead successfully added to campaign

application/json

400
Bad request

application/json

401
Unauthorized - Invalid API key

application/json

403
Forbidden - API key issue, contact admin

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads/campaign
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads/campaign \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "api_key": "",
  "linkedin_url": "",
  "campaign_id": ""
}'

Test Request
(post /api/v1/leads/campaign)
Status:200
Status:400
Status:401
Status:403
Status:500

Copy content
{
  "message": "success"
}
Lead successfully added to campaign

Remove lead from campaign​#Copy link
Body
required
application/json
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
Responses

200
Lead successfully deleted

application/json

400
Bad request

application/json

401
Unauthorized - Invalid API key

application/json

403
Forbidden - Invalid API key or contact not in workspace

application/json

404
Lead not found

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads/campaign/delete
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads/campaign/delete \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "api_key": "",
  "linkedin_url": ""
}'

Test Request
(post /api/v1/leads/campaign/delete)
Status:200
Status:400
Status:401
Status:403
Status:404
Status:500

Copy content
{
  "message": "success"
}
Lead successfully deleted

Delete a lead from workspace​#Copy link
Body
required
application/json
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
Responses

200
Lead successfully deleted

application/json

400
Bad request

application/json

401
Unauthorized - Invalid API key

application/json

403
Forbidden - Invalid API key or contact not in workspace

application/json

404
Lead not found

application/json

500
Internal server error

application/json
Request Example for
post
/api/v1/leads/contact/delete
Selected HTTP client:Shell Curl

Curl
Copy content
curl https://prosp.ai/api/v1/leads/contact/delete \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "api_key": "",
  "linkedin_url": ""
}'

Test Request
(post /api/v1/leads/contact/delete)
Status:200
Status:400
Status:401
Status:403
Status:404
Status:500

Copy content
{
  "message": "success"
}
Lead successfully deleted

Models

LeadToCampaignRequest​#Copy link
api_key
Type:string
required
linkedin_url
Type:string
required
campaign_id
Type:string
required

SuccessResponse​#Copy link
message
Type:string
Example

ErrorResponse​#Copy link
message
Type:string
Example

LeadToContactsRequest​#Copy link
apiKey
Type:string
required
linkedinUrl
Type:string
Format:uri
required
list_id
Type:string
required
data
Type:array object[]

data

DeleteLeadRequest​#Copy link
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required

LeadRequest​#Copy link
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
list_id
Type:string
required
campaign_id
Type:string
required
data
Type:array object[]

data

SendMessageRequest​#Copy link
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
sender
Type:string
Format:uri
required
message
Type:string
required

SendVoiceMessageRequest​#Copy link
api_key
Type:string
required
linkedin_url
Type:string
Format:uri
required
sender
Type:string
Format:uri
required
message
Type:string
required