const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	green: "\x1b[32m",
	cyan: "\x1b[36m",
	magenta: "\x1b[35m"
};

//==================================================================

const failDB_Operation = (res, err, msg) => {
	console.log(`${colors.red}DB Error\n===========${colors.reset}`);
	console.log(`${colors.yellow}Note :${colors.reset}`, msg);
	console.log(`${colors.red}Err :${colors.reset}`, err);
	
    return res.code(500).send({error: "Action failed due to server issue"});
}

//==================================================================

const notFound = (res) => {
	return res.code(404).send({error: "Job Post not found"})
}

//==================================================================

const getJobList = async (req, res) => {

	try {
		const result = await req.server.db.query("SELECT * FROM jobs ORDER BY id DESC");
		res.send(result.rows);

	} catch (err) {
		failDB_Operation(res, err, "Failed to retrieve job list");
	}
}

//==================================================================

const getRecentJob = async (req, res) => {

	try {
		const result = await req.server.db.query("SELECT * FROM jobs ORDER BY id DESC LIMIT 3");
		res.send(result.rows);

	} catch (err) {
		failDB_Operation(res, err, "Failed to retrieve job list");
	}
}

//==================================================================

const getSingleJob = async (req, res) => {
	const id = req.params.id;

	try {
		const result = await req.server.db.query("SELECT * FROM jobs WHERE id = $1",[id]);

		if (result.rows.length === 0) { 
			return notFound(res);
		}
		res.send(result.rows[0]);

	} catch (err) {
		failDB_Operation(res, err, `Failed to retrieve job for id=${id}`);
	}
}

//==================================================================

const addJob = async (req,res) => {
	const {
		role, type, state, jobDetail, salary, 
		companyName, companyDetail, companyEmail, companyPhone, googleMap
	} = req.body;

	try {
		const result = await req.server.db.query(
			`INSERT INTO jobs (
				role, type, state, jobDetail, salary,
				companyName, companyDetail, companyEmail, companyPhone, googleMap
                )
			VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10) RETURNING *`,
			[role, type, state, jobDetail, salary, 
			 companyName, companyDetail, companyEmail, companyPhone, googleMap]
		);
		res.code(201).send(result.rows[0]);

	} catch (err) {
		failDB_Operation(res, err, "Failed to save data");
	}
}

//==================================================================

const deleteJob = async (req, res) => {
	const id = req.params.id;

	try {
		const result = await req.server.db.query("DELETE FROM jobs WHERE id = $1",[id]);

		res.code(200).send({message: "Job post successfully removed."});

	} catch (err) {
		failDB_Operation(res, err, `Failed to delete job for id=${id}`);
	}
}

//==================================================================

const updateJob = async(req, res) => {
	const id  = req.params.id;
	
	const {
		role, type, state, jobDetail, salary, 
		companyName, companyDetail, companyEmail, companyPhone, googleMap
	} = req.body;

	try {
		const result = await req.server.db.query(
			`UPDATE jobs SET
				role = $1, 
				type = $2, 
				state = $3, 
				jobDetail = $4, 
				salary = $5,
				companyName = $6, 
				companyDetail = $7, 
				companyEmail = $8, 
				companyPhone = $9,
				googleMap = $10 WHERE id = $11 RETURNING *`,
			[role, type, state, jobDetail, salary, 
			 companyName, companyDetail, companyEmail, companyPhone, googleMap, id]
		);
		res.code(200).send(result.rows[0]);

	} catch (err) {
		failDB_Operation(res, err, `Failed to update data from id=${id}`);
	}
};

export {getRecentJob, getJobList, getSingleJob, addJob, deleteJob, updateJob};