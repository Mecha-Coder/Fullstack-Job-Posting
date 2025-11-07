import Fastify from 'fastify';
//import dotenv from 'dotenv';
import cors from '@fastify/cors';
import pg from 'pg';
import {
	getJobList, 
	getSingleJob, 
	addJob, 
	deleteJob, 
	updateJob,
	getRecentJob,
} from "./handler.js";

//dotenv.config({ path: "../.env" });

const fastify = Fastify({ logger: true });
const { Pool } = pg;
const PORT = process.env.BACKEND_PORT || 5000;

await fastify.register(cors, {
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
});

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
})

// Make pool available throughout your app
fastify.decorate('db', pool)

fastify.get("/jobs",     getJobList);
fastify.get("/jobs/recent", getRecentJob);
fastify.get("/jobs/:id", getSingleJob);
fastify.post("/jobs",    addJob);
fastify.delete("/jobs/:id", deleteJob);
fastify.put("/jobs/:id", updateJob);

//===========================================================
// Start server

await fastify.ready();
fastify.listen({ port: PORT,  host: '0.0.0.0'}, (err) => {
	if (err) throw err
	console.log("Server is running...")
})

