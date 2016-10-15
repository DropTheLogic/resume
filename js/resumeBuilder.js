var model = {
	bio: {
		"name" : "Danny Márquez",
		"role" : "Front End Web Developer",
		"contacts" : {
			"mobile" : "(917) 399-5264",
			"email" : "DannyBrianMarquez@gmail.com",
			"github" : "DropTheLogic",
			"twitter" : "@DropTheLogic",
			"linkedin" : "DannyMarquez",
			"location" : "Washington Heights, New York City"
		},
		"biopic" : "images/pic.jpg",
		"welcomeMessage" : "I'm looking for an entryway into a tech career where I can draw on my life skills and my technical skills in a team-oriented environment",
		"skills" : [
			"Management", "Photoshop", "Graphic Design", "HTML/CSS", "JavaScript"
		]
	},

	projects: {
		"projects" : [
			{
				"title" : "Portfolio",
				"dates" : "2015",
				"description" : "Designed one-page, responsive portfolio website",
				"images" : "images/danny-marquez-portfolio-screen.png",
				"url" : "http://danny-marquez.com/portfolio/"
			},
			{
				"title" : "JavaScript Game",
				"dates" : "2016",
				"description" : "Wrote object-oriented app in JavaScript",
				"images" : "images/danny-marquez-game-screen.png",
				"url" : "http://danny-marquez.com/BugRun/"
			}
		]
	},

	work: {
		"jobs" : [
			{
				"title" : "Graphic/Web Designer",
				"employer" : "Freelance",
				"dates" : "2001-current",
				"location" : "262 Meserole St, Brooklyn, NY",
				"description" : [
					"Design and maintain websites and/or promotional material for artists and musicians",
					"Work with clients to find theme and feel for their visual representation",
					"Develop and maintain web sites for clients, using modern responsive design"
					],
				"url" : "http://www.danny-marquez.com/portfolio/"
			},
			{
				"title" : "Manager",
				"employer" : "Nick's Family-Style Restaurant and Pizzeria",
				"dates" : "2003-current",
				"location" : "1814 2nd Ave, New York City",
				"description" : [
					"Oversee and manage mid-sized restaurant and staff of over 20 workers",
					"Responsible for inventory and ordering of all restaurant dry-goods, food and alcohol",
					"Coordinate, staff and retain crews of prep workers, cooks and servers",
					"Create brand loyalty and provide customer service for strong repeat business"
					],
				"url" : "http://www.nicksnyc.com"
			},
			{
				"title" : "Art Director",
				"employer" : "Foul Magazine",
				"dates" : "2001-2002",
				"location" : "12 St Marks Place, New York City",
				"description" : [
					"Designed, laid-out and prepared all elements for a video-game/lifestyle print magazine",
					"Coordinated with staff to prepare design, art, editorial and advertising for print",
					"Worked under tight deadlines to push issues out on-time",
					"Delegated and managed art and design to subordinates as needed"
					],
				"url" : "http://www.villagevoice.com/best-of/2008/arts-and-entertainment/best-video-game-magazine-6445513"
			}
		]
	},

	education: {
		"schools" : [
			{
				"name" : "New York University",
				"dates" : "1997-2001",
				"location" : "1 Washington Place, New York City",
				"degree" : "Bachelor of Arts",
				"majors" : ["Individualized Study with Concentration: Technology in the Arts"],
				"url" : "http://gallatin.nyu.edu/"
			}
		],
		"onlineCourses" : [
			{
				"title" : "Front-End Web Developer Nanodegree",
				"date" : "2015-2016",
				"school" : "Udacity",
				"url" : "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
			}
		]
	}
};

/* Map */
$('#mapDiv').append(googleMap);
$('a[href="#mapDiv"]').on("shown.bs.tab", function (e) {
		'use strict';
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
		map.setZoom(10);
});

var controller = {
	init: function() {
		view.init();
	},

	/* International name caps */
	makeInName: function(name) {
		var names = name.split(" ");
		var firstName = names[0].slice(0,1).toUpperCase() + names[0].slice(1).toLowerCase();
		var lastName = names[1].toUpperCase();
		return firstName + " " + lastName;
	},

	getProp: function(section, listing, prop) {
		if (prop) {
			return model[section][listing][prop];
		}
		else if (listing) {
			return model[section][listing];
		}
		return model[section];
	}
};

var view = {
	init: function() {
		view.render();
	},

	renderBio: function() {
		var bio = controller.getProp('bio');
		var formattedName = HTMLheaderName.replace('%data%', bio.name);
		var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
		$('#header').prepend(formattedRole);
		$('#header').prepend(formattedName);

		var contacts = bio.contacts;
		var formattedBioPic = HTMLbioPic.replace('%data%', bio.biopic);
		var formattedMobile = HTMLmobile.replace('%data%', contacts.mobile);
		var formattedEmail = HTMLemail.replace(/%data%/g, contacts.email);
		var formattedTwitter= HTMLtwitter.replace(/%data%/g, contacts.twitter);
		var formattedGithub = HTMLgithub.replace(/%data%/g, contacts.github);
		var formattedLinkedIn = HTMLlinkedIn.replace(/%data%/g, contacts.linkedin);
		var formattedMsg = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);

		$('#topContacts').append(formattedMobile, formattedEmail, formattedTwitter, formattedLinkedIn, formattedGithub);
		$('#sub-header').append(formattedBioPic, formattedMsg);

		// Skills
		if (bio.skills.length) {
			$('#sub-header').append(HTMLskillsStart);
			// List each skill
			for (var i = 0; i < bio.skills.length; i++) {
				var formattedSkill = HTMLskills.replace('%data%', bio.skills[i]);
				$('#skills').append(formattedSkill);
			}
		}
	},

	renderWork: function() {
		var jobs = controller.getProp('work', 'jobs');
		if (jobs) {
			jobs.forEach(function(job) {
				$('#workExperience').append(HTMLworkStart);
				var formattedEmployer = HTMLworkEmployer.replace('%data%', job.employer).replace('%url%', job.url);
				var formattedTitle = HTMLworkTitle.replace('%data%', job.title);
				var formattedEmployerTitle = formattedEmployer + formattedTitle;
				var formattedLocation = HTMLworkLocation.replace('%data%', job.location);
				var formattedDates = HTMLworkDates.replace('%data%', job.dates);
				$('.work-entry:last').append(formattedEmployerTitle, formattedDates, formattedLocation);
				for (var i = 0; i < job.description.length; i++) {
					var formattedWorkDescription = HTMLworkDescription.replace('%data%', job.description[i]);
					$('.work-entry:last').append(formattedWorkDescription);
				}
			});
		}
	},

	renderProjects: function() {
		var projects = controller.getProp('projects', 'projects');
		if (projects) {
			projects.forEach(function (project) {
				$('#projects').append(HTMLprojectStart);
				var formattedTitle = HTMLprojectTitle.replace('%data%', project.title).replace('%url%', project.url);
				var formattedDates = HTMLprojectDates.replace('%data%', project.dates);
				var formattedDescription = HTMLprojectDescription.replace('%data%', project.description);
				var formattedImage = HTMLprojectImage.replace('%data%', project.images);
				$('.project-entry:last').append(formattedTitle, formattedDates, formattedDescription, formattedImage);
			});
		}
	},

	renderEducation: function() {
		var schools = controller.getProp('education', 'schools');
		if (schools) {
			$('#education').append(HTMLschools);
			schools.forEach(function(school) {
				$('#education').append(HTMLschoolStart);
				var formattedName = HTMLschoolName.replace('%data%', school.name).replace('%url%', school.url);
				var formattedDates = HTMLschoolDates.replace('%data%', school.dates);
				var formattedDegree = HTMLschoolDegree.replace('%data%', school.degree);
				var formattedLocation = HTMLschoolLocation.replace('%data%', school.location);
				var formattedMajor = HTMLschoolMajor.replace('%data%', school.majors);
				$('.education-entry:last').append(formattedName, formattedDates, formattedDegree, formattedLocation, formattedMajor);
			});
		}
		var online = controller.getProp('education', 'onlineCourses');
		if (online) {
			$('#education').append(HTMLonlineClasses);
			online.forEach(function(course) {
				$('#education').append(HTMLschoolStart);
				var formattedTitle = HTMLonlineTitle.replace('%data%', course.title).replace('%url%', course.url);
				var formattedSchool = HTMLonlineSchool.replace('%data%', course.school);
				var formattedCDates = HTMLonlineDates.replace('%data%', course.date);
				var formattedURL = HTMLonlineURL.replace('%data%', course.url).replace('%url%', course.url);
				$('.education-entry:last').append(formattedTitle, formattedSchool, formattedCDates, formattedURL);
			});
		}
	},

	renderFooter: function() {
		var formattedMobile = HTMLfooterMobile.replace('%data%', controller.getProp('bio', 'contacts', 'mobile'));
		var formattedEmail = HTMLfooterEmail.replace(/%data%/g, controller.getProp('bio', 'contacts', 'email'));
		var formattedTwitter = HTMLfooterTwitter.replace(/%data%/g, controller.getProp('bio', 'contacts', 'twitter'));
		var formattedLinkedIn = HTMLfooterLinkedIn.replace(/%data%/g, controller.getProp('bio', 'contacts', 'linkedin'));
		var formattedGithub = HTMLfooterGithub.replace(/%data%/g, controller.getProp('bio', 'contacts', 'github'));
		$('#footerContacts').append(formattedMobile, formattedEmail, formattedTwitter, formattedLinkedIn, formattedGithub);
	},

	render: function() {
		view.renderBio();
		view.renderWork();
		view.renderProjects();
		view.renderEducation();
		view.renderFooter();
	}
};

controller.init();