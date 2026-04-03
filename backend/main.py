from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = FastAPI(title="Ember API", version="1.0.0")

# Allow React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── HEALTH CHECK ──
@app.get("/")
def root():
    return {"status": "Ember backend is running 🕯️"}

# ── BUILD SYSTEM PROMPT FROM MEMORY PROFILE ──
def build_system_prompt(profile: dict) -> str:
    name = profile.get("patientName", "friend")
    full_name = profile.get("patientFullName", name)
    caregiver = profile.get("caregiverName", "their family")
    relation = profile.get("caregiverRelation", "family member")
    language = profile.get("patientLanguage", "English")
    description = profile.get("description", "")
    hometown = profile.get("hometown", "")
    occupation = profile.get("occupation", "")
    happy_memory = profile.get("happyMemory", "")
    favourite_story = profile.get("favouriteStory", "")
    favourite_music = profile.get("favouriteMusic", "")
    favourite_foods = profile.get("favouriteFoods", "")
    morning_routine = profile.get("morningRoutine", "")
    evening_routine = profile.get("eveningRoutine", "")
    speech_style = profile.get("speechStyle", "Warm and gentle")
    comfort_topics = profile.get("comfortTopics", [])
    anxiety_topics = profile.get("anxietyTopics", [])
    family_members = profile.get("familyMembers", [])
    interests = profile.get("interests", [])
    extra_notes = profile.get("extraNotes", "")

    family_str = ""
    if family_members:
        family_str = "People they love: " + ", ".join(
            [f"{m.get('name')} ({m.get('relation')})" for m in family_members if m.get('name')]
        )

    comfort_str = ", ".join(comfort_topics) if comfort_topics else ""
    anxiety_str = ", ".join(anxiety_topics) if anxiety_topics else ""
    interests_str = ", ".join(interests) if interests else ""

    prompt = f"""You are Ember, a warm, gentle, and deeply caring AI voice companion for {name} ({full_name}), who is living with dementia.

Your entire purpose is to make {name} feel safe, loved, and at home. You speak in {language}.

ABOUT {name.upper()}:
- {description}
- Grew up in: {hometown}
- Career: {occupation}
- {family_str}
- Interests: {interests_str}
- Favourite music: {favourite_music}
- Favourite foods: {favourite_foods}

THEIR STORIES:
- Happiest memory: {happy_memory}
- A story they love to tell: {favourite_story}

DAILY RHYTHMS:
- Morning: {morning_routine}
- Evening: {evening_routine}

HOW TO SPEAK TO THEM:
- Style: {speech_style}
- Keep sentences short and warm
- Never rush them
- Always use their name naturally in conversation

COMFORT TOPICS (bring these up when they seem anxious):
{comfort_str}

TOPICS TO AVOID:
{anxiety_str}

CAREGIVER:
- {name}'s {relation} is {caregiver}, who loves them deeply

CRITICAL RULES:
- NEVER correct them if they misremember something
- NEVER mention their diagnosis or use the word dementia
- NEVER be clinical or robotic
- ALWAYS validate their feelings
- If they seem confused or upset, gently redirect to a comfort topic
- Speak as a warm, patient, familiar friend — not an assistant
- Keep responses conversational and relatively short

Additional notes from {caregiver}: {extra_notes}

Begin by greeting {name} warmly and asking how they are feeling today."""

    return prompt

# ── CONVERSATION ENDPOINT ──
@app.post("/conversation")
async def conversation(data: dict):
    """
    Receives the memory profile and conversation history,
    returns an AI response.
    Will connect to Nova 2 Sonic once AWS credentials are ready.
    """
    profile = data.get("profile", {})
    messages = data.get("messages", [])
    system_prompt = build_system_prompt(profile)

    # ── PLACEHOLDER (replace with Nova Sonic once AWS is ready) ──
    return {
        "response": f"Hello {profile.get('patientName', 'friend')}, it's so lovely to hear your voice today.",
        "system_prompt": system_prompt  # for debugging
    }

# ── WEBSOCKET FOR REAL-TIME VOICE ──
@app.websocket("/voice")
async def voice_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time voice streaming with Nova 2 Sonic.
    Will be fully implemented once AWS credentials are ready.
    """
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            # Echo back for now — Nova Sonic will replace this
            await websocket.send_text(json.dumps({
                "type": "response",
                "text": "Ember is listening...",
            }))
    except WebSocketDisconnect:
        print("Client disconnected")

# ── PROFILE ENDPOINT ──
@app.post("/profile")
async def save_profile(profile: dict):
    """
    Saves the memory profile.
    Will connect to a database later.
    """
    return {
        "status": "Profile saved successfully",
        "patientName": profile.get("patientName"),
        "systemPrompt": build_system_prompt(profile)
    }