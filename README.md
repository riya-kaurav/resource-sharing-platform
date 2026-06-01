#  ResourceBox

ResourceBox is a full-stack, production-oriented web application designed to enable authenticated users to upload, discover,
search, and upvote high-value educational resources.

## Why This Project Exists

*Most resource-sharing apps are either:*

- UI-heavy but backend-weak
- CRUD-only demos
- Lack scalable search & data modeling
  
*ResourceBox was intentionally built to demonstrate:*

- Real-world authentication architecture
- Search optimization using MongoDB indexing
- Cloud-based file storage handling
- Clean API-layer separation
- Production-grade frontend-backend integration

---
## System Architecture

```text
[ Client (React + Tailwind) ]
                ↓
[ Axios (JWT Interceptor) ]
                ↓
[ Express REST API ]
                ↓
[ MongoDB (Indexed Queries) ]
                ↓
[ Cloudinary (PDF Storage) ]
```

---

##  Tech Stack

*Frontend*
- React
- Axios
- Tailwind CSS
- React router

*Backend*
- Node.js
- Express.js
- MongoDB 
- JWT Authentication
- Multer
- Cloudinary

---

##  Core Features

- User Authentication (JWT based)
- Upload academic resources
- Tag-based search & filtering
- Like resources
- Role-based protected APIs
- Clean, scalable folder structure


---

## About the Developer

I build systems with attention to architecture, scalability, and clean design not just features.

If you're interested in collaboration or discussing engineering decisions behind this project, feel free to connect.
