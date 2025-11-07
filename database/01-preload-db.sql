CREATE TABLE jobs (
    id            SERIAL PRIMARY KEY,
    role          VARCHAR(100) NOT NULL,
    type          VARCHAR(50) NOT NULL,
    state         VARCHAR(100) NOT NULL,
    jobDetail     TEXT NOT NULL,
    salary        VARCHAR(100) NOT NULL,
    companyName   VARCHAR(100) NOT NULL,
    companyDetail TEXT NOT NULL,
    companyEmail  VARCHAR(100) NOT NULL CHECK (companyEmail LIKE '%@%.%'),
    companyPhone  VARCHAR(50) NOT NULL CHECK (companyPhone ~ '^\+?[0-9\s\-\(\)\.]+$'),
    googleMap     TEXT NOT NULL CHECK (googleMap ~* '^https?://')
);

INSERT INTO jobs (role, type, state, jobDetail, salary, companyName, companyDetail, companyEmail, companyPhone, googleMap) VALUES (
    'Senior React Developer',
    'Full-Time',
    'Boston, MA',
    'We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with experience working with modern JavaScript frameworks such as React or Angular.',
    '$70K - $180K',
    'NewTek Solutions',
    'NewTek Solutions is a leading technology company specializing in web development and digital solutions. We pride ourselves on delivering high-quality products and services to our clients while fostering a collaborative and innovative work environment.',
    'contact@teksolutions.com',
    '60-172345-019',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.59714733669!2d35.87837931207558!3d31.9989345232325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c9f878a323e49%3A0xf2472ae87f82c28d!2sNewTek%20Solutions!5e0!3m2!1sen!2smy!4v1762420180700!5m2!1sen!2smy'
);

INSERT INTO jobs (role, type, state, jobDetail, salary, companyName, companyDetail, companyEmail, companyPhone, googleMap) VALUES (
    'Front-End Engineer (React & Redux)',
    'Full-Time',
    'Miami, FL',
    'Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion for crafting beautiful and responsive web applications. Experience with UI/UX design principles and a strong attention to detail are highly desirable.',
    '$70K - $80K',
    'Veneer Solutions',
    'Veneer Solutions is a creative agency specializing in digital design and development. Our team is dedicated to pushing the boundaries of creativity and innovation to deliver exceptional results for our clients.',
    'contact@loremipsum.com',
    '151-565-5858',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2372.423694609221!2d-2.0409238871756843!3d53.51448956201328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bc83a12b99a93%3A0xf38ff32a2bc26f6c!2sVeneering%20Solutions!5e0!3m2!1sen!2smy!4v1762420201817!5m2!1sen!2smy'
);

INSERT INTO jobs (role, type, state, jobDetail, salary, companyName, companyDetail, companyEmail, companyPhone, googleMap) VALUES (
    'React.js Dev',
    'Part-Time',
    'Brooklyn, NY',
    'Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference. We offer competitive compensation and a collaborative work environment where your ideas are valued.',
    '$70K - $80K',
    'Dolor Cloud',
    'Dolor Cloud is a leading technology company specializing in digital solutions for businesses of all sizes. With a focus on innovation and customer satisfaction, we are committed to delivering cutting-edge products and services.',
    'contact@dolorsitamet.com',
    '857-800-5151',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5094557004795!2d121.01756421175801!3d14.626997876368668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b76e2881530f%3A0x4674295d8782a3c5!2sLoudcloud%20Inc!5e0!3m2!1sen!2smy!4v1762420286500!5m2!1sen!2smy'
);

INSERT INTO jobs (role, type, state, jobDetail, salary, companyName, companyDetail, companyEmail, companyPhone, googleMap) VALUES (
    'React Front-End Developer',
    'Part-Time',
    'Pheonix, AZ',
    'Join our team as a Part-Time Front-End Developer in beautiful Pheonix, AZ. We are looking for a self-motivated individual with a passion for creating engaging user experiences. This position offers flexible hours and the opportunity to work remotely.',
    '$60K - $70K',
    'Alpha Elite',
    'Alpha Elite is a dynamic startup specializing in digital marketing and web development. We are committed to fostering a diverse and inclusive workplace where creativity and innovation thrive.',
    'contact@adipisicingelit.com',
    '515-375-7553',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63344.85050948636!2d-112.11667185377337!3d33.445304354910576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ%2C%20USA!5e0!3m2!1sen!2smy!4v1762420317128!5m2!1sen!2smy'
);

INSERT INTO jobs (role, type, state, jobDetail, salary, companyName, companyDetail, companyEmail, companyPhone, googleMap) VALUES (
    'Full Stack React Developer',
    'Full-Time',
    'Atlanta, GA',
    'Exciting opportunity for a Full-Time Front-End Developer in bustling Atlanta, GA. We are seeking a talented individual with a passion for building elegant and scalable web applications. Join our team and make an impact!',
    '$90K - $100K',
    'Browning Technologies',
    'Browning Technologies is a rapidly growing technology company specializing in e-commerce solutions. We offer a dynamic and collaborative work environment where employees are encouraged to think creatively and innovate.',
    'contact@consecteturadipisicing.com',
    '999-555-5555',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.210251689908!2d-111.94399618788793!3d33.365576553563535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b0749a8749d2d%3A0x3ab391efad366841!2sXTech%20Tactical!5e0!3m2!1sen!2smy!4v1762420339478!5m2!1sen!2smy'
);

INSERT INTO jobs (role, type, state, jobDetail, salary, companyName, companyDetail, companyEmail, companyPhone, googleMap) VALUES (
    'React Native Developer',
    'Intern',
    'Portland',
    'Join our team as a Front-End Developer in beautiful Portland, OR. We are looking for a skilled and enthusiastic individual to help us create innovative web solutions. Competitive salary and great benefits package available.',
    '$100K - $110K',
    'Port Solutions INC',
    'Port Solutions is a leading technology company specializing in software development and digital marketing. We are committed to providing our clients with cutting-edge solutions and our employees with a supportive and rewarding work environment.',
    'contact@ipsumlorem.com',
    '405-151-8577',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8149294562027!2d-111.94299888788622!3d33.428069050318115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b096618e6221d%3A0x8bec71165fcdfdd7!2sPorts%20America!5e0!3m2!1sen!2smy!4v1762420358080!5m2!1sen!2smy'
);
