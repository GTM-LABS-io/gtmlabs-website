Consumption
a.The generated video consumption is based on its duration:
1 API credit is consumed for every 2 minutes of video.
Less than 2 minutes is calculated as 1 API credit.
b.The preview video consumption is based on its duration:
0.5 API credit is consumed for every 2 minutes of video.
Less than 2 minutes is calculated as 0.5 API credit.
c.Each time you call the AI Scripts API:
it will consume 0.2 API Credit.
d. Image Generation Charges:
Each call generates four images.
Each image deducts 0.05 credit.
Four images deduct a total of 0.2 credit.
e. Motion Generation Charges:
Motion 1.0 deducts 2 credits.
Motion 2.0 deducts 2 credits.
Motion 2.0 Pro deducts 3 credits.
Create Avatar Videos Using Library Avatars


Create Avatar Videos
Create Avatar Videos Using Library Avatars
How to create avatar video with the avatars from library.
​
Introduction
Welcome to the Jogg.ai API! This document will guide you on how to create a avatar video by calling our API.
​
Core Concept: Asynchronous Processing Flow
Before you begin, it is crucial to understand that creating an avatar video is an asynchronous operation. This means you will not receive the final video file immediately after calling the API.The entire process is as follows:
Submit Task: Your application sends a POST request to Jogg.ai, containing the video script, selected avatar, and all other necessary information.
Receive Confirmation: The Jogg.ai server validates your request. If it’s valid, it will immediately return a 200 Accepted response, which includes a unique project_id. This ID is your credential for tracking this task.
Background Processing: Your video creation task enters our processing queue. The server will render the video in the background based on the current workload. This process can take anywhere from a few seconds to several minutes.
Retrieve Result: Once the video processing is complete, you can obtain the result in one of two ways:
Webhook (Recommended): We will send a POST notification to your pre-configured webhook_url, containing the video status and the final video playback address. This is the most efficient and reliable method.
Polling (Alternative): You can use the project_id to periodically call the GET /project/{project_id} endpoint to check the task status.
​
Quick Start
Please refer to the Create Talking Avatar Videos for more details and refer to the next section for obtaining the avatar_id and voice_id.
​
Here is a code example
Request Example：
Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_talking_avatar' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "script": "Hi, welcome to JoggAI and create longer videos with Talking Avatars in minutes!",
    "aspect_ratio": 0,
    "screen_style": 1,
    "avatar_id": 127,
    "avatar_type": 0,
    "voice_id": "en-US-ChristopherNeural",
    "caption": true,
	"video_name":"my_video"   
}'

Response example:
Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "<project-id>"  
    }
}

​
Get Avatars and Voices List
If you want to change the Avatar or voice, you can obtain the avatar_id from Public Avatars List and the voice_id from Public Voices List to make replacements.
​
Public Avatars List
Please refer to the Get Avatar List from Library for more details.
Copy
curl --request GET \
  --url https://api.jogg.ai/v1/avatars?
  aspect_ratio=0&style=professional&gender=male&age=adult \
  --header 'accept: application/json' \
  --header 'x-api-key: <api-key>'

Parameters:
aspect_ratio : Video aspect ratio (0: [9:16], 1: [16:9])
style : Video preset style (professional, social）
gender : Avatar gender(female, male）
age : Avatar age (adult, senior, young_adult)
All query parameters are non-mandatory.
Response example:
Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "avatars": [
            {
                "avatar_id": 81,         
                "name": "Amanda outdoors",
                "cover_url": "<avatar-cover-url>",
                "aspect_ratio": 0,
                "style": "social",
                "gender": "male",
                "age": "young",
                "status": 0
            }
        ]
    }
}

​
Public Voices List
Please refer to the Get Voice List form Library for more details.
Copy
curl --request GET \
  --url https://api.jogg.ai/v1/voices?
  gender=female&language=english&age=young \
  --header 'x-api-key: <api-key>'

Parameters:
gender : Avatar gender(female, male）
language : Filter voices by language
age : Avatar age (young, middle_aged, old)
All query parameters are non-mandatory.
Response example:
Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "voices": [
            {
                "name": "Emily",
                "voice_id": "en-US-ChristopherNeural", 
                "audio_url": "<audio-url>",
                "language": "chinese",
                "gender": "male",
                "age": "young"
            }
        ]
    }
}

​
Get the generated video
Use the project_id obtained from the “Generate Video from Product Information” step to retrieve details about the video generation, including status and duration. Access the generated video using the video_url.Please refer to the GetGeneratedVideo for the full options of enums.
Copy
curl --location --request GET 'https://api.jogg.ai/v1/project?project_id=fa6228c0f52c4f3986e88f7ffa5d2864' \
--header 'x-api-key: <your-api-key>' \

Response example:
Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "id": "fa6228c0f52c4f3986e88f7ffa5d2864",
        "title": "welcome to jogg.ai",
        "video_url": "https://res.jogg.ai/video.webm",
        "cover_url": "https://res.jogg.ai/cover.png",
        "video_duration": 6,
        "status_code": 4,
        "status_desc": "success",
        "created_at": 1732806631
    }
}

Getting Started


Create Avatar Videos Using Instant Avatars
How to create avatar video with instant avatars.

​
Introduction
Welcome to the Jogg.ai API! This document will guide you on how to create a avatar video by calling our API.
​
Core Concept: Asynchronous Processing Flow
Before you begin, it is crucial to understand that creating an avatar video is an asynchronous operation. This means you will not receive the final video file immediately after calling the API.
The entire process is as follows:
Submit Task: Your application sends a POST request to Jogg.ai, containing the video script, selected avatar, and all other necessary information.
Receive Confirmation: The Jogg.ai server validates your request. If it’s valid, it will immediately return a 200 Accepted response, which includes a unique project_id. This ID is your credential for tracking this task.
Background Processing: Your video creation task enters our processing queue. The server will render the video in the background based on the current workload. This process can take anywhere from a few seconds to several minutes.
Retrieve Result: Once the video processing is complete, you can obtain the result in one of two ways:
Webhook (Recommended): We will send a POST notification to your pre-configured webhook_url, containing the video status and the final video playback address. This is the most efficient and reliable method.
Polling (Alternative): You can use the project_id to periodically call the GET /project/{project_id} endpoint to check the task status.
​
Quick Start
​
Create Talking Avatar Video
First, create your Instant Avatar on the Create Instant Avatar page. Then, use the My Instant Avatars List endpoint to obtain your Avatar ID, and the My Voices List endpoint to retrieve your Voice for video creation.
Please refer to the Create Talking Avatar Videos for more details and refer to the next section for obtaining the avatar_id and voice_id.
​
Here is a code example
Request Example：

Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_talking_avatar' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "script": "Hi, welcome to JoggAI and create longer videos with Talking Avatars in minutes!",
    "aspect_ratio": 0,
    "screen_style": 1,
    "avatar_id": 127,
    "avatar_type": 0,
    "voice_id": "en-US-ChristopherNeural",
    "caption": true,
	"video_name":"my_video"   
}'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "<project-id>"   
    }
}
​
Get Avatars and Voices List
If you want to change the Avatar or voice, you can obtain the avatar_id from My Instant Avatars List and the voice_id from My Voices List to make replacements.
​
My Instant Avatars List
Please refer to the Get Instant Avatar List for more details.

Copy
curl --request GET \
  --url https://api.jogg.ai/v1/avatars/custom \
  --header 'accept: application/json' \
  --header 'x-api-key: <api-key>'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "avatars": [
            {
                "avatar_id": 81,
                "name": "Amanda outdoors",
                "cover_url": "<avatar-cover-url>",
                "status": 1
            }
        ]
    }
}
​
My Voices List
Please refer to the Get My Voice for more details.

Copy
curl --request GET \
  --url https://api.jogg.ai/v1/voices/custom \
  --header 'x-api-key: <api-key>'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "voices": [
            {
                "name": "Emily",
                "voice_id": "en-US-ChristopherNeural",
                "audio_url": "<voice-audio-url>",
                "language": "english"
            }
        ]
    }
}
​
Get the generated video
Use the project_id obtained from the “Generate Video from Product Information” step to retrieve details about the video generation, including status and duration. Access the generated video using the video_url.
Please refer to the GetGeneratedVideo for the full options of enums.

Copy
curl --location --request GET 'https://api.jogg.ai/v1/project?project_id=fa6228c0f52c4f3986e88f7ffa5d2864' \
--header 'x-api-key: <your-api-key>' \
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "id": "fa6228c0f52c4f3986e88f7ffa5d2864",
        "title": "welcome to jogg.ai",
        "video_url": "https://res.jogg.ai/video.webm",
        "cover_url": "https://res.jogg.ai/cover.png",
        "video_duration": 6,
        "status_code": 4,
        "status_desc": "success",
        "created_at": 1732806631
    }
}
Create Avatar Videos Using Photo Avatars
How to create avatar video with Photo avatars.

​
Introduction
Using the JoggAI API, you can create videos with Photo Avatars. In this tutorial, we’ll guide you through making a video using your customized Photo Avatar and cloned Voice.
​
Core Concept: Asynchronous Processing Flow
Before you begin, it is crucial to understand that creating an avatar video is an asynchronous operation. This means you will not receive the final video file immediately after calling the API.
The entire process is as follows:
Submit Task: Your application sends a POST request to Jogg.ai, containing the video script, selected avatar, and all other necessary information.
Receive Confirmation: The Jogg.ai server validates your request. If it’s valid, it will immediately return a 200 Accepted response, which includes a unique project_id. This ID is your credential for tracking this task.
Background Processing: Your video creation task enters our processing queue. The server will render the video in the background based on the current workload. This process can take anywhere from a few seconds to several minutes.
Retrieve Result: Once the video processing is complete, you can obtain the result in one of two ways:
Webhook (Recommended): We will send a POST notification to your pre-configured webhook_url, containing the video status and the final video playback address. This is the most efficient and reliable method.
Polling (Alternative): You can use the project_id to periodically call the GET /project/{project_id} endpoint to check the task status.
​
Quick Start
​
Create Talking Avatar Video
First, create your Photo Avatar on the Create photo Avatar page. Then, use the My Photo Avatars List endpoint to obtain your Avatar ID, and the My Voices List endpoint to retrieve your Voice for video creation.
Please refer to the Create Talking Avatar Videos for more details and refer to the next section for obtaining the avatar_id and voice_id.
​
Here is a code example
Request Example：

Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_talking_avatar' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "script": "Hi, welcome to JoggAI and create longer videos with Talking Avatars in minutes!",
    "aspect_ratio": 0,
    "screen_style": 1,
    "avatar_id": 127,
    "avatar_type": 0,
    "voice_id": "en-US-ChristopherNeural",
    "caption": true,
	"video_name":"my_video"   
}'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "<project-id>"   
    }
}
​
Get Avatars and Voices List
If you want to change the Avatar or voice, you can obtain the avatar_id from My Photo Avatars List and the voice_id from My Voices List to make replacements.
​
My Photo Avatars List
Please refer to the Get Photo Avatar List for more details.

Copy
curl --request GET \
  --url https://api.jogg.ai/v1/avatars/photo_avatars \
  --header 'accept: application/json' \
  --header 'x-api-key: <api-key>'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "avatars": [
            {
                "avatar_id": 81,
                "name": "Amanda outdoors",
                "cover_url": "<avatar-cover-url>",
                "status": 1
            }
        ]
    }
}
​
My Voices List
Please refer to the Get My Voice for more details.

Copy
curl --request GET \
  --url https://api.jogg.ai/v1/voices/custom \
  --header 'x-api-key: <api-key>'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "voices": [
            {
                "name": "Emily",
                "voice_id": "en-US-ChristopherNeural",
                "audio_url": "<voice-audio-url>",
                "language": "english"
            }
        ]
    }
}
​
Get the generated video
Use the project_id obtained from the “Generate Video from Product Information” step to retrieve details about the video generation, including status and duration. Access the generated video using the video_url.
Please refer to the GetGeneratedVideo for the full options of enums.

Copy
curl --location --request GET 'https://api.jogg.ai/v1/project?project_id=fa6228c0f52c4f3986e88f7ffa5d2864' \
--header 'x-api-key: <your-api-key>' \
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "id": "fa6228c0f52c4f3986e88f7ffa5d2864",
        "title": "welcome to jogg.ai",
        "video_url": "https://res.jogg.ai/video.webm",
        "cover_url": "https://res.jogg.ai/cover.png",
        "video_duration": 6,
        "status_code": 4,
        "status_desc": "success",
        "created_at": 1732806631
    }
}
Using Audio Source as Voice
create avatar video by uploading audio.

​
Introduction
This document provides a detailed guide on how to use your own audio file as a voice source to generate a digital avatar video via the Jogg.ai API. This feature allows the digital avatar model to perform lip-syncing to any voice you provide (e.g., your own recording).
​
Core Concept: Audio-Driven Lip-Sync
Unlike using a preset voice (voice_id), the core of this feature is “audio-first”. You provide an audio file containing speech, and our system will analyze this audio to drive the digital avatar’s mouth movements to precisely match the pronunciation in the audio.
Asynchronous Processing: This process is also asynchronous. After submitting the task, you will immediately receive a project_id, and the video will be processed in the background.
Audio is Key: The voice of the character in the video will come entirely from the audio file you provide.
Automatic Lip-Sync: The system automatically analyzes the audio waveform and phonemes to generate highly synchronized lip animations.
​
Upload Audio
You can upload audio to obtain your asset_id.
Please refer to the Upload Media for more details.

Copy
curl --request POST \
  --url https://api.jogg.ai/v1/upload/asset \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
--data-raw '{
    "filename":"1.jpg"
}'
​
Obtain the Signed URL
Before uploading a file, you need to obtain a signed URL via an API request. Here’s an example response:

Copy
{
  "rid": "ab3329c49f320dba9a57d742195d930b",
  "code": 0,
  "msg": "<string>",
  "data": {
    "sign_url": "<string>",
    "asset_id": "<string>"
  }
}
sign_url: Use this URL to upload the file.
​
Use cURL to Upload the File
Use the following cURL command to upload the file to the server. Make sure to replace <file-binary-data> with the actual binary data of the file.

Copy
curl --location --request PUT '<sign_url>' \
--header 'Content-Type: application/octet-stream' \
--data-binary '<file-binary-data>'

Copy
{
    "rid": "1e66bb40e189f7fb2936330863c1468e",
    "code": 0,
    "msg": "success"
}
​
Create Talking Avatar Video
Please refer to the Create Talking Avatar Videos for more details.

Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_talking_avatar' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "audio_url": <your-audio-url>,
    "aspect_ratio": 0,
    "screen_style": 1,
    "avatar_id": 127,
    "avatar_type": 0,
    "caption": true   
}'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "<project-id>"   
    }
}
​
Get the generated video
Use the project_id obtained from the “Generate Video from Product Information” step to retrieve details about the video generation, including status and duration. Access the generated video using the video_url.
Please refer to the GetGeneratedVideo for the full options of enums.

Copy
curl --location --request GET 'https://api.jogg.ai/v1/project?project_id=fa6228c0f52c4f3986e88f7ffa5d2864' \
--header 'x-api-key: <your-api-key>' \
Response example:

Copy
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "fa6228c0f52c4f3986e88f7ffa5d2864",
        "title": "welcome to jogg.ai",
        "status": 4,
        "status_desc": "success",
        "video_duration": 6,
        "video_url": "https://res.jogg.ai/video.webm",
        "cover_url": "https://res.jogg.ai/cover.png",
        "created_at": 1732806631
    }
}
Create Transparent Avatar Videos in WebM/MP4 Format
How to create transparent avatar videos in WebM/MP4 format.

This document will guide you on how to create a digital avatar video with a transparent background using the Jogg.ai API. This type of video is ideal for post-production compositing or for overlaying the digital avatar on other visual content such as web pages or apps.
​
Core Concepts: Alpha Channel & File Formats
When you request a transparent background video, we add an Alpha Channel to the video file. This channel stores transparency information, making all areas of the video completely transparent except for the digital avatar itself.
Use Cases:
Seamlessly overlaying the digital avatar onto another video clip in video editing software (e.g., Adobe Premiere, Final Cut Pro).
Placing the digital avatar video on a top layer in web development to interact with the content below.
File Format: The standard MP4 format does not typically support an Alpha channel for transparency. Therefore, transparent background videos will be provided in .webm or .mov format. Please ensure your player or editing tool supports these formats.
Asynchronous Processing: Like all video creation tasks, this process is asynchronous.
​
Create Talking Avatar Video
Use the Create Talking Avatar Video API to control the output format by selecting the desired video specification with the screen_style parameter. This parameter controls the background style, allowing you to choose between videos with a background, green screen videos, or videos with a transparent background.
Please note: If you need to output a WebM video with a transparent channel, please set the caption to false; otherwise, the WebM video cannot be generated.
Please refer to the Create Talking Avatar Videos for more details and refer to the next section for obtaining the avatar_id and voice_id.
​
Here is a code example
Request Example：

Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_talking_avatar' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "script": "Hi, welcome to JoggAI and create longer videos with Talking Avatars in minutes!",
    "aspect_ratio": 0,
    "screen_style": 1,# Background style 1: With background, 2: Green screen, 3: Transparent background(Webm)
    "avatar_id": 127,
    "avatar_type": 0,
    "voice_id": "en-US-ChristopherNeural",
    "caption": true,
	"video_name":"my_video"   
}'
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "<project-id>"   
    }
}
​
Consumption
The generated video consumption is based on its duration: 1 credit is consumed for every 2 minutes of video.
Create Video from URL/Product info
How to create video from URL/Product info .

​
Introduction
This document introduces an advanced feature: how to provide a public URL via the Jogg.ai API to have the system automatically extract content, generate a summary, and ultimately create a digital avatar narration video.
​
Core Concept: Automated Content Creation Workflow
This feature is designed to automate content processing. You only need to provide a link to the content, and our AI system will handle all subsequent work.
Submit URL: You provide a publicly accessible URL via the API (e.g., a news article, blog post, or Amazon/Shopify/ebay/Tiktok product link).
Content Extraction & Analysis: The Jogg.ai server will visit the URL and intelligently extract the core text or video script content.
AI-Generated Summary: Our artificial intelligence model will condense the extracted content into a summary script suitable for video narration.
Video Synthesis: The system uses your specified digital avatar and voice to automatically generate a complete video based on the summary script.
Asynchronous Notification: Like all video creation tasks, this is an asynchronous process. Once the task is complete, we will notify you of the result via a webhook.
​
Quick Start
​
Prerequisite
You need a JoggAI account with API access.
You need to go through the  Get your API key
​
Main Steps
Generate a video in the following four steps:
Upload the URL to create the product and analyze the URL to retrieve product information. Or directly upload product information.
Update the product information if necessary(Optionally).
Initiate video generation based on the product, with the option to adjust video settings.
Get the generated video.
​
Upload URL / Product info to create product
Upload the URL to create the product and analyze the URL to retrieve product information. Or directly upload product information.
Please refer to the Upload URL to create product for more details.

Copy
curl --request POST \
  --url https://api.jogg.ai/v1/product \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "url": "https://res.jogg.ai.com/product_url", // Not required, if it is filled, the following product information will not take effect.
  // If the above URL is not specified, the following product information takes effect. name, description, and media are required parameters.
  "name": "Physicians Formula Happy Booster Heart Blush Glow &amp;amp; Mood Boosting, Rose, Dermatologist Tested",
  "description": "Brush on a radiant blushing glow: Ultra-soft and blendable blushing powder features a fresh and vibrant mix of blushing tones infused with a pop of color to create a healthy glow. Multi-reflective pearls provide a soft iridescence to highlight contour and add radiance to cheeks. Experience the mood boosting effect: Infused with our Happy Boost Blend featuring Happy Skin and Euphoryl, natural plant extracts which have been shown to promote a feeling of happiness by mimicking the effect of Endorphins and helping protect the skin from environmental stress. ",
  "target_audience": "",
  "media": [
    {
      "type": 1,
      "name": "media.jpg",
      "url": "https://res.jogg.ai/media.jpg",
      "description": "Brush on a radiant blushing glow: Ultra-soft and blendable blushing powder features a fresh and vibrant mix of blushing tones infused with a pop of color to create a healthy glow."
    }
  ]
  
}
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "product_id": "NTQ0MTkzNjg",
        "url": "https://www.amazon.com/Physicians-Formula-Happy-Booster-Boosting/dp/B004HYNCA0/ref=pd_pss_dp_d_1_d_sccl_2_5/138-8774804-7229638?pd_rd_w=Tv0XC&content-id=amzn1.sym.427cdbb1-779c-4be6-8c9b-81ddadc2ade4&pf_rd_p=427cdbb1-779c-4be6-8c9b-81ddadc2ade4&pf_rd_r=D8HMAN0M29D09GNV840V&pd_rd_wg=cQL8r&pd_rd_r=ea6b53cb-04b0-4b85-977d-a74804551bd8&pd_rd_i=B004HYNCA0&psc=1",
        "name": "Physician Tested update",
        "description": "Brush on a radiant blushing glow: Ultra-soft and blendable blushing powder features a fresh and vibrant mix of blushing tones infused with a pop of color to create a healthy glow. Multi-reflective pearls provide a soft iridescence to highlight contour and add radiance to cheeks.",
        "media": [
            {
                "type": 2,
                "name": "c7131c6d03cf0e5df33f7db8f1176c32.mp4",
                "url": "https://res.jogg.ai/c7131c6d03cf0e5df33f7db8f1176c32.mp4",
                "description": ""
            },
            {
                "type": 1,
                "name": "Image2",
                "url": "https://res.jogg.ai/2484eeeac5ae6360284fa2f04f1a2691.jpg",
                "description": "This product offers versatile blush shades in \"Rose\" and \"Natural,\" suitable for diverse skin tones, enhancing a natural, radiant look for makeup enthusiasts."
            },
            {
                "type": 1,
                "name": "Image3",
                "url": "https://res.jogg.ai/a6e523fb48f0ac488dae85578c30e2ab.jpg",
                "description": "Heart-themed blush compacts offer a satin finish with a rose-tinted glow, perfect for enhancing a natural or rosy complexion for beauty enthusiasts."
            },
            {
                "type": 1,
                "name": "Image4",
                "url": "https://res.jogg.ai/ed39da987c4c513b15f1a4915b033175.jpg",
                "description": "Heart-themed blush with mood-boosting violet scent, includes brush and mirror for convenient application, ideal for enhancing complexion and uplifting spirits."
            }
        ],
        "target_audience": ""
    }
}
​
Update Product Information(Optional)
Update the product information if necessary(Optionally).
Please refer to the Update Product Information for more details.

Copy
curl --location --request PUT 'https://api.jogg.ai/v1/product' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
        "product_id": "NTQ0MTkzNjg",
        "name": "Physician Tested update",
        "description": "Brush on a radiant blushing glow: Ultra-soft and blendable blushing powder features a fresh and vibrant mix of blushing tones infused with a pop of color to create a healthy glow. Multi-reflective pearls provide a soft iridescence to highlight contour and add radiance to cheeks. 
        "media": [
            {
                "type": 2,
                "name": "c7131c6d03cf0e5df33f7db8f1176c32.mp4",
                "url": "https://res.jogg.ai/c7131c6d03cf0e5df33f7db8f1176c32.mp4",
                "description": ""
            },
            {
                "type": 1,
                "name": "Image2",
                "url": "https://res.jogg.ai/2484eeeac5ae6360284fa2f04f1a2691.jpg",
                "description": "This product offers versatile blush shades in \"Rose\" and \"Natural,\" suitable for diverse skin tones, enhancing a natural, radiant look for makeup enthusiasts."
            },
            {
                "type": 1,
                "name": "Image3",
                "url": "https://res.jogg.ai/a6e523fb48f0ac488dae85578c30e2ab.jpg",
                "description": "Heart-themed blush compacts offer a satin finish with a rose-tinted glow, perfect for enhancing a natural or rosy complexion for beauty enthusiasts."
            },
            {
                "type": 1,
                "name": "Image4",
                "url": "https://res.jogg.ai/ed39da987c4c513b15f1a4915b033175.jpg",
                "description": "Heart-themed blush with mood-boosting violet scent, includes brush and mirror for convenient application, ideal for enhancing complexion and uplifting spirits."
            }
        ],
        "target_audience": ""
}'
​
Generate Video from Product Information
Please refer to the Generate Video from Product Information for more details.
​
With Visual Style
Initiate a video generation task, where you can adjust video-related parameters and modify the video’s layout by selecting a visual style. You can view Get Visual Style for more details.

Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_url' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "product_id": "NTQ0MTkzNjg",
    "aspect_ratio": 0,
    "video_length":"15",
    "language": "english",
    "avatar_id": 127,
    "avatar_type":0,
    "visual_style": "FullScreen",
    "script_style": "Don't Worry",
    "voice_id":"en-US-ChristopherNeural",
    "music_id": 62,
    "template_type": "public",
    "override_script": "",
    "caption": true,
	"video_name":"my_video"
    }
Response example:

Copy
{
    "rid": "864ecc09edbc22041a7312fb4ffb0cd2",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "7321782d69884a869400beb255e3ca91"
    }
}
​
With Template
Initiate a video generation task where you can adjust video-related parameters and customize the video’s style and appearance by selecting a template.
You can view Get Template List from Library for more details.

Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_url' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "product_id": "NTQ0MTkzNjg",
    "aspect_ratio": 0,
    "video_length":"15",
    "language": "english",
    "caption": true,
    "avatar_id": 100266,
    "avatar_type":1,
    "script_style": "Don't Worry",
    "template_id":0,
    "voice_id":"en-US-ChristopherNeural",
    "music_id": 62,
    "template_type": "public",
    "override_script": "",
    "caption": true
}
Response example:

Copy
{
    "rid": "864ecc09edbc22041a7312fb4ffb0cd2",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "7321782d69884a869400beb255e3ca91"
    }
}
​
Get the generated video
Use the project_id obtained from the “Generate Video from Product Information” step to retrieve details about the video generation, including status and duration. Access the generated video using the video_url.
Please refer to the GetGeneratedVideo for the full options of enums.

Copy
curl --location --request GET 'https://api.jogg.ai/v1/project?project_id=fa6228c0f52c4f3986e88f7ffa5d2864' \
--header 'x-api-key: <your-api-key>' \
Response example:

Copy
{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "id": "fa6228c0f52c4f3986e88f7ffa5d2864",
        "title": "welcome to jogg.ai",
        "video_url": "https://res.jogg.ai/video.webm",
        "cover_url": "https://res.jogg.ai/cover.png",
        "video_duration": 6,
        "status_code": 4,
        "status_desc": "success",
        "created_at": 1732806631
    }
}

Create Video from Your Template
How to create video from Your Template.

​
Introduction
​
Core Concept: Templates and Variables
The core of this feature is the use of a pre-designed Template. Each template includes a fixed layout, animations, background music, and a series of fillable Variables or placeholders.
When calling the API, you only need to specify the template_id to use and provide a JSON object containing the specific values for all variables.
Separation of Design and Content: You don’t need to worry about the visual design details of the video; just focus on providing the content.
Batch Generation: This method is ideal for scenarios that require batch generation of stylistically consistent videos, such as news flashes, product introductions, marketing campaigns, etc.
Asynchronous Processing: Like all video creation tasks, this is an asynchronous process. Once the task is complete, we will notify you of the result via a webhook.
​
Quick Start
​
Prerequisite
You need a JoggAI account with API access.
You need to go through the Get your API key.
​
How to Find Templates and Variables?
Before using this feature, you need to know:
Which templates are available (template_id).
Which variables need to be filled for each template (the name and type of the variables).
You can obtain this information in the following ways:
Template Library API: Call GET /v1/templates/custom to get a list of all available templates and their details.
Developer Dashboard: Log in to your Jogg.ai developer dashboard and browse and manage your templates in the “Template Library” section.
​
Procedure
Creating Template through the Interface.
Define the replaceable elements in the template.
Modify Template Elements and Generate Video.
​
Step 1: Creating Template through the Interface
​
Create your own templates in the user interface
There are two types of templates. One is in the public library, and the other is created by individuals.
The templates created by yourself can be directly copied with their IDs.

​
Obtain the list of templates
You can also obtain the template_id you need by getting the list of templates.
Get My Templates
Through the following request, you can get the templates that you created yourself.

Request

Response

Copy
curl --request GET \
  --url 'https://api.jogg.ai/v1/templates/custom' \
  --header 'x-API-key: <API-key>'
  --header 'Content-Type: application/json' 
​
Step 2: Define the replaceable elements in the template.
On the interface, define variables.
You can customize variable names for the elements in the template to facilitate your identification and replacement of them. 
Tip: Currently, only script content, text, image, video and avatar are supported.

​
Step 3: Modify Template Elements and Generate Video**.**
Pass the parameters for generating the video to the template, and it will return a generated video_ID.

Request

Response

Copy
curl --location --request POST \
--url  'https://api.jogg.ai/v1/create_video_with_template' \
--header  'x-API-key: <your-API-key>' \
--header  'Content-Type: application/json'

--data-raw  '{
	"template_id": 0,         // required；
	"template_type": "user",  // required；Template type; default is "user";
	"avatar_id": 0,           // required；Digital person ID;
	"avatar_type": 0,         // required；Determine the source of the avatar, whether it is in a public library or created by an individual
    "lang": "english",        // required;t
	"video_name":"my_video",
	"variables": [
		{
			"type": "text",    
			"name": "Text_element",   // Name of the variable to be replaced as set in the template
			"properties": {
				"content": "test"
			},

		},
		{
			"type": "image",
			"name": "image_name",
			"properties": {
				"url": "<your-image-url>"  // "https://res.jogg.ai/image_name.jpg"
			}

		},
		{
			"type": "video",
			"name": "video_name",
			"properties": {
				"url": "<your-video-url>"  // "https://res.jogg.ai/video_name.mp4"
			}

		},
		{
			"type": "script",
			"name": "script_en",
			"properties": {
				"content": "script_content"
			}
		}
	]
}
​
Replace Text / Image / Video / in Template
How to replace the text, images and videos in the template.
​
Relevant parameters
Text Properties:
content: Text content.
Image Properties:
url: URL of the image content.
Video Properties:
url: URL of the video content.
​
Example
Define the variable.

Modify Template Elements and Generate Video.

Request

Response

Copy
curl --location --request POST \
--url  'https://api.jogg.ai/v1/create_video_with_template' \
--header  'x-API-key: <your-API-key>' \
--header  'Content-Type: application/json'

--data-raw  '{
	"template_id": 0,         // required；
	"template_type": "user",  // required；Template type; default is "user"
	"avatar_id": 0,           // required；Digital person ID;
	"avatar_type": 0,         // required；Determine the source of the avatar, whether it is in a public library or created by an individual
    "lang": "english",        // required;The language;
	"video_name":"my_video",
	"variables": [
		{
			"type": "text",    
			"name": "Text_element",   // Name of the variable to be replaced as set in the template
			"properties": {
				"content": "test"
			}
		},
		{
			"type": "image",
			"name": "image_name",
			"properties": {
				"url": "<your-image-url>"  // "https://res.jogg.ai/image_name.jpg"
			}

		},
		{
			"type": "video",
			"name": "video_name",
			"properties": {
				"url": "<your-video-url>"  // "https://res.jogg.ai/video_name.mp4"
			}

		}
	]
}
​
Replace Script content in Template
How to replace the scripts content within the template.
​
Relevant parameters
Script Properties:
content: Script content.
​
Example
Define the variable.

Modify Template Elements and Generate Video.

Resquest

Response

Copy
curl --location --request POST \
--url  'https://api.jogg.ai/v1/create_video_with_template' \
--header  'x-API-key: <your-API-key>' \
--header  'Content-Type: application/json'

--data-raw  '{
	"template_id": 0,         // required；
	"template_type": "user",  // required；Template type; default is "user";
	"avatar_id": 0,           // required；Digital person ID;
	"avatar_type": 0,         // required；Determine the source of the avatar, whether it is in a public library or created by an individual
    "lang": "english",         // required;The language;
	"video_name":"my_video"   
	"variables": [
		{
      "type": "script",
      "name": "script_en",
      "properties": {
        "content": "script_content"  
      }

    }
	]
}
​
Replace Avatar in Template
How to replace the Avatar within the template.
​
Relevant parameters
Avatar Properties:
content: Avatar ID.
​
Example
Modify the Avatar ID and Generate Video.

Resquest

Response

Copy
curl --location --request POST \
--url  'https://api.jogg.ai/v1/create_video_with_template' \
--header  'x-API-key: <your-API-key>' \
--header  'Content-Type: application/json'

--data-raw  '{
	"template_id": 0,         // required；
	"template_type": "user",  // required；Template type; default is "user";
	"avatar_id": 0,           // required；Set the corresponding avatar ID;
	"avatar_type": 0,         // required；Determine the source of the avatar, whether it is in a public library or created by an individual
    "lang": "english",         // required;The language;
	"video_name":"my_video"

}
Callout Content.
We also have a feature that we don’t recommend to use very often: adding a tag to the script to implement pause in the video editor. It allows you to silence your video for a set amount of time.
Add a pause to the script with <break time=\"2s\" />.

Copy
curl --location --request POST \
--url  'https://api.jogg.ai/v1/create_video_with_template' \
--header 'x-api-key: <your-API-key>' \
--data '{
 	"template_id": 0,         // required；
	"template_type": "user",  // required；Template type; default is "user";
	"avatar_id": 0,           // required；Set the corresponding avatar ID;
	"avatar_type": 0,         // required；Determine the source of the avatar, whether it is in a public library or created by an individual
    "lang": "english",         // required;The language;
    "video_name":"my_video",   
	"variables": [
      {
        "type": "script",
        "name": "script_en",
        "properties": {
        "content": "<break time=\"2s\" />"  // Add a pause 
      }
    }
  ]
}'

Create Photo Avatar
Transform static images into dynamic, talking avatars with JoggAI’s Photo Avatar API.

To bring your photo avatars to life, here’s a breakdown of the steps involved in uploading, generating, training LORA models, creating new looks, and adding motion for use in JoggAI videos:
​
Steps to Use the Photo Avatar API
Upload Existing Photos or Generate New AI Avatar Photos: You can upload a set of your own photos or generate new AI photos.
Create New Looks for the Avatar: You can use prompts to generate various “looks” for the avatar, such as different clothing, scenes, or poses. This is done within the trained Avatar Group, giving you diverse outputs.
Add Motion Programmatically: You can enhance the avatars by adding dynamic motion programmatically. This includes enabling the avatar to move and adding audio to bring the avatar to life.
a. Image Generation Charges:
Each call generates four images.
Each image deducts 0.05 credit.
Four images deduct a total of 0.2 credit.
b. Motion Generation Charges:
Motion 1.0 deducts 2 credits.
Motion 2.0 deducts 2 credits.
Motion 2.0 Pro deducts 3 credits.
Motion 3.0 deducts 2 credits.
​
Conclusion
Once you’ve created the photo avatar and added motion , you can use these avatars in video generation. This makes it possible to integrate highly personalized, animated avatars into video content creation, enhancing the overall user experience.
​
Generate AI Avatar Photos
Learn how to create customized AI avatar photos using JoggAI’s API. These avatars can be personalized with attributes such as age, gender, ethnicity, pose, style, and appearance. Once generated, these avatars can be used to create new looks for further customization.
​
Generate AI Avatar Photo
See detailed API reference
Use this endpoint to generate AI photo avatars with customizable attributes. The following attributes are required to define the avatar’s look: avatar_styleage, gender, ethnicity, appearance, background, model, aspect_ratio.

Request

Response

Copy
{
    "rid": "9ee49c2f31204f76da8081ce0af28eae",
    "code": 0,
    "msg": "success",
    "data": {
        "photo_id": "25-1a0ab69d92b6449796d6e9ec0b993a3f"
    }
}
​
Check Generation Status
See detailed API reference
Track the progress of your avatar photo generation using the following endpoint:

Request

Response(in Progress)

Response(Error)

Response (Success)

Copy
curl --request GET \
     --url https://api.jogg.ai/v1/photo_avatar/generation?photo_id=4ea4fea89c724fcfb49502c4323bac55 \
     --header 'accept: application/json' \
     --header 'x-api-key: <your_api_key>'
We have generated our AI Avatar photos, now we can use these image_key to create new looks.
​
Wechat IMG58 Pn
Generate Avatar New Look Photo
See detailed API reference
To generate looks for the photo avatar, you can use the Generate Avatar New Look Photo API. Provide a description in the prompt field, as well as the orientation, pose, and style.

Request

Response

Copy
{
  "code": 123,
  "msg": "<string>",
  "data": {
    "photo_id": "123"
  }
}
​
Check status of the look generation
Using the photo_id.
See detailed API reference


Response(in Progress)

Response(Error)

Response (Success)

Copy
curl --request GET \
     --url https://api.jogg.ai/v1/photo_avatar/generation?photo_id=4ea4fea89c724fcfb49502c4323bac55 \
     --header 'accept: application/json' \
     --header 'x-api-key: <your_api_key>'
​
Wechat IMG57 Pn
Conclusion
In conclusion, By leveraging tools like the Cenerate Avatar photo and Add Looks APIs, users can upload, organize, and enhance avatars with ease.
​
Add Motion to Your Photo Avatar
Enhance your photo avatar by adding dynamic motion and immersive sound effects! Follow this step-by-step guide to bring your avatar to life.
​
Add Motion
See detailed API reference
Add motion to your photo avatar by sending a POST request to the API with the avatar’s ID.

Request

Response

Copy
{
    "rid": "f7c5edfc9eed0db89ef68dadf4604a6b",
    "code": 0,
    "msg": "success",
    "data": {
        "motion_id": "25-937af73859a74666b8a4572eb61b4dd5",
        "name": "name",
        "avatar_id": 155182
    }
}
​
Check status of the motion generation
See detailed API reference

Request

Response (Pending)

Response (Error)

Response (Completed)

Copy
curl --request GET \
--url https://api.jogg.ai/v1/photo_avatar?motion_id=e08fcc7348ef4f839ed31abf000cef2c \
--header 'accept: application/json' \
--header 'x-api-key: <your_api_key>'
​
Conclusion
By following the steps outlined in this guide, you can easily add dynamic motion and immersive sound effects to your photo avatars, enhancing the user experience and bringing your avatars to life.

AI Scripts
How to generate AI scripts from product?

​
Introduction
Using the JoggAI API, you can generate AI scripts effortlessly. Simply provide the product information or the product_id generated in the Upload URL to create product, and you can create several different styles of product introduction scripts.
​
Quick Start
​
Generate Scripts from product
Provide the product information or the product_id generated at the “Upload URL to Create Product” endpoint, and you can create several different styles of product introduction scripts. If you do not provide the product_id, then the product’s name and description are required.
Please refer to the AI Scripts for more details.

Copy
curl --location --request POST 'https://api.jogg.ai/v1/ai_scripts' \
--header 'x-api-key: <your-api-key>' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--data-raw '{
    "product_id": "",
    "name": "Owala FreeSip Insulated Stainless Steel Water Bottle with Straw for Sports, Travel, and School BPA-Free Sports Water Bottle, 24 oz, Shy Marshmallow",
    "description": "24-ounce insulated stainless-steel water bottle with a FreeSip spout and push-button lid with lock\nPatented FreeSip spout designed for either sipping upright through the built-in straw or tilting back to swig from the spout opening\nProtective push-to-open lid keeps spout clean; convenient carry loop doubles as a lock\nDouble-wall insulation keeps drinks cold for up to 24 hours; wide opening for cleaning and adding ice; cup holder-friendly base\nBPA, lead, and phthalate-free; hand wash cup, dishwasher-safe lid; not for use with hot liquids",
    "target_audience": "test",
    "video_length": "15",
    "language": "english"
}'
Response example:

Copy

{
    "rid": "e1e2ccf9a266619517eb70ab35393ed6",
    "code": 0,
    "msg": "success",
    "data": {
        "generated_scripts": [
            {
                "script_paragraphs": "Ever tried drinking water while running? It's like a comedy show!You either spill it all over or look like a fish out of water.Then I found the Owala FreeSip bottle—game changer, folks!Sip upright or swig like a champ, no spills in sight!Stay hydrated with style—24 oz of pure refreshment, Shy Marshmallow!",
                "script_style": "Storytime"
            },
            {
                "script_paragraphs": "Stay refreshed with the Owala FreeSip's 24-ounce capacity!Enjoy sipping upright or swigging from the spout—your choice!Double-wall insulation keeps drinks cold for 24 hours, amazing right?BPA-free and easy to clean—perfect for sports, travel, or school!Grab yours today and elevate your hydration game!",
                "script_style": "Top 3 reasons"
            },
            {
                "script_paragraphs": "Meet the Owala FreeSip Water Bottle: your hydration superhero!Sip upright through the straw or tilt for a swig—your choice!Double-wall insulation keeps drinks cold for 24 hours. Chill vibes only!BPA-free and easy to clean; it’s a bottle, not a science experiment!Perfect for sports, travel, or school—stay hydrated in style!",
                "script_style": "Data"
            },
            {
                "script_paragraphs": "Ever tried drinking water while running? It's like a comedy show!You tilt, you sip, and suddenly, it's a water fountain explosion.Then there’s the awkward moment when you need a straw, but don’t have one.Imagine a world where sipping and swigging are both possible, effortlessly.Meet the Owala FreeSip Water Bottle, your hydration hero for every adventure!",
                "script_style": "Light marketing"
            }
        ]
    }
}
​
Use the script for video generation.
You can replace the script using the override_script parameter in the Generate Video from Product Information endpoint.
​
Consumption
Each time you call the AI Scripts API, it will consume 0.2 API Credit.


Upload Media
Upload your own media resources.

​
Introduction
This document will guide you on how to upload your own media files (such as images or audio) via the Jogg.ai API. After a successful upload, you will receive a Jogg.ai-hosted URL, which can be used in other API calls, for example, as a video background or a custom voice source.
​
Core Concept: Obtaining a Hosted URL
Why use this API?
When creating a video, certain parameters (like background_url or audio_url) require a publicly accessible URL. If your media file is not on a public server, you can use this API to upload the file to Jogg.ai’s secure servers to obtain a temporary, usable hosted URL.
Even if you have a publicly accessible URL, we still recommend uploading it to Jogg.ai’s secure servers, as your own URL might cause the task to fail due to network instability.
Process:
Upload your local file via this API.
The API returns a JSON response containing a media_url.
In your API request to create a video, use this media_url as the value for the corresponding parameter.
Request Format: File uploads must use the multipart/form-data request body format.
​
Step 1: Obtain sign_url and asset_id
You can upload media to obtain your sign_url and asset_id.
sign_url: Used as the address to upload media.
asset_id: Gets the address of the uploaded resource.
Please refer to the Upload Media for more details.
Request:

Copy
curl --request POST \
  --url https://api.jogg.ai/v1/upload/asset \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
--data-raw '{
    "filename":"1.jpg"
}'
Response:

Copy
{
  "rid": "ab3329c49f320dba9a57d742195d930b",
  "code": 0,
  "msg": "<string>",
  "data": {
    "sign_url": "<string>",
    "asset_id": "<string>"
  }
}
You can upload pictures, videos, audio and other media resources.
​
Step 2: Use sign_url to upload the file
Use the following cURL command to upload the file to the server. Make sure to replace <file-binary-data> with the actual binary data of the file.
Request:

Copy
curl --location --request PUT '<sign_url>' \
--header 'Content-Type: application/octet-stream' \
--data-binary '<file-binary-data>'
Pesponse:

Copy
{
    "rid": "1e66bb40e189f7fb2936330863c1468e",
    "code": 0,
    "msg": "success"
}
Now asset_id is an available address to get resources.
​
Step 3: Use asset_id to get the file
Here’s an example:

Copy
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_talking_avatar' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "audio_url": <your-audio-url>, //The media you upload.
    "aspect_ratio": 0,
    "screen_style": 1,
    "avatar_id": 127,
    "avatar_type": 0,
    "caption": true   
}'

Webhook Integration Guide
How to receive notifications for various events through webhooks.

​
Overview
Jogg provides webhooks to notify your application about asynchronous events in real-time. When an event occurs (like video generation completion), we’ll send an HTTP POST request to your configured endpoint with event details.
​
API Endpoints
​
List Webhook Endpoints
Lists all webhook endpoints for the authenticated user.
Please refer to the List of Webhook Endpoints for more details.

Copy
curl --location --request GET 'https://api.jogg.ai/v1/webhook/endpoints' \
--header 'x-api-key: <your-api-key>'
Response

Copy
{
  "data": [
    {
      "endpoint_id": "b1ac30a401234c96ad128303dfb431e2",
      "url": "https://example.com/webhook",
      "secret": "a1b2c3d4e5f6g7h8",
      "status": "enabled",
      "events": ["generated_video_success"],
      "username": "jogg@gmail.com",
      "created_at": 1703894400
    }
  ]
}
​
Add Webhook Endpoint
Create a new webhook endpoint configuration. The system will automatically generate a 16-character secret key for signature verification.
Please refer to the Add a Webhook Endpoint for more details.

Copy
curl --location --request POST 'https://api.jogg.ai/v1/webhook/endpoint' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://example.com/webhook",
    "events": ["generated_video_success"],
    "status": "enabled"
}'
Response

Copy
{
    "endpoint_id": "b1ac30a401234c96ad128303dfb431e2",
    "url": "https://example.com/webhook",
    "secret": "a1b2c3d4e5f6g7h8",
    "status": "enabled",
    "events": ["generated_video_success"],
    "username": "jogg@gmail.com",
    "created_at": 1703894400
}
​
Update Webhook Endpoint
Update an existing webhook endpoint configuration. Note that the secret key cannot be modified.
Please refer to the Update a Webhook Endpoint for more details.

Copy
curl --location --request PUT 'https://api.jogg.ai/v1/webhook/endpoint/{endpoint_id}' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://example.com/webhook",
    "events": ["generated_video_success"],
    "status": "enabled"
}'
​
Delete Webhook Endpoint
Delete an existing webhook endpoint.
Please refer to the Delete a Webhook Endpoint for more details.

Copy
curl --location --request DELETE 'https://api.jogg.ai/v1/webhook/endpoint/{endpoint_id}' \
--header 'x-api-key: <your-api-key>'
​
List Available Events
Get a list of available webhook events.
Please refer to the List of Available Webhook Events for more details.

Copy
curl --location --request GET 'https://api.jogg.ai/v1/webhook/events' \
--header 'x-api-key: <your-api-key>'
Response

Copy
{
  "data": [
    "generated_video_success",
    "generated_video_failed"
  ]
}
​
Event Types
​
Video Generation Success
Triggered when video generation completes successfully.
Payload

Copy
{
  "event_id": "evt_123456789",
  "event": "generated_video_success",
  "timestamp": 1703894400,
  "data": {
    "project_id": "string",
    "video_url": "string",
    "duration": number
  }
}
​
Video Generation Failed
Triggered when video generation fails.
Payload

Copy
{
  "event_id": "evt_123456789",
  "event": "generated_video_failed",
  "timestamp": 1703894400,
  "data": {
    "project_id": "string",
    "error": {
      "message": "string"
    }
  }
}
​
Security Implementation
​
Secret and Signature Verification
When creating a webhook endpoint, the system automatically generates a 16-character secret key. This secret is used to sign webhook payloads, allowing you to verify that requests are coming from Jogg.
All webhook URLs must use HTTPS
Each webhook request is signed using HMAC SHA-256 with your secret key
The signature is included in the X-Webhook-Signature header
The signature is computed on the raw request body
​
Example Request Headers

Copy
POST /webhook HTTP/1.1
Host: your-domain.com
Content-Type: application/json
X-Webhook-Event: generated_video_success
X-Webhook-Signature: 7256c87be255861cbbe92f4a04a4500176b045a287f258e32e5b6c6b96d7f290
User-Agent: Jogg-Webhook/1.0
​
Signature Verification Examples
​
Go

Copy
func VerifyWebhookSignature(payload []byte, signature, secret string) bool {
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write(payload)
    expectedSignature := hex.EncodeToString(mac.Sum(nil))
    return hmac.Equal([]byte(signature), []byte(expectedSignature))
}
​
Python

Copy
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)
​
Node.js

Copy
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
    const expected = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expected)
    );
}
​
Best Practices
​
Security
Keep your webhook secret secure and never expose it
Always verify signatures before processing webhooks
Use HTTPS endpoints only
Implement request timeout (recommended: 10s)
Use constant-time string comparison for signature verification
Store webhook logs for security auditing
​
Implementation
Process webhooks asynchronously
Return 2xx status quickly, process later
Implement idempotency using event_id
Store webhook logs for debugging
Monitor webhook delivery status
​
Error Handling
​
Retry Mechanism
Non-2xx responses trigger retries
Maximum 3 retry attempts
5 second delay between retries
Only 2xx responses are considered successful
​
Monitoring
Monitor webhook logs for delivery issues
Track retry counts and failure rates
Set up alerts for repeated failures
Consider implementing a manual retry mechanism