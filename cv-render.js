// cv-render.js

function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
}

function setHtml(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.innerHTML = value;
}

function setSrc(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.src = value;
}

function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}

/* WEB LAYOUT */
function renderWeb() {
    setSrc("web-photo", CV.personal.photo);
    setText("web-name", CV.personal.name.toUpperCase());
    setText("web-title", CV.personal.titleWeb);
    setText("web-email", CV.personal.email);
    setText("web-phone", CV.personal.phone);
    setText("web-location", CV.personal.shortLocation);

    if (CV.personal.linkedin) {
        const c = document.getElementById("web-linkedin-container");
        const a = document.getElementById("web-linkedin");
        c.style.display = "flex";
        a.href = CV.personal.linkedin;
    }
    if (CV.personal.github) {
        const c = document.getElementById("web-github-container");
        const a = document.getElementById("web-github");
        c.style.display = "flex";
        a.href = CV.personal.github;
    }

    const pDiv = document.getElementById("web-presentazione");
    if (pDiv) {
        pDiv.innerHTML = "";
        CV.presentation.forEach(par => {
            const p = document.createElement("p");
            p.textContent = par;
            pDiv.appendChild(p);
        });
    }

    const expDiv = document.getElementById("web-experience-list");
    if (expDiv) {
        expDiv.innerHTML = "";
        CV.experience.forEach(exp => {
            const item = createEl("div", "web-experience-item");
            const h3 = createEl("h3", "web-job-header", `${exp.role} – ${exp.company}`);
            const period = createEl("p", "web-job-period", `${exp.period} · ${exp.location}`);

            const tech = createEl("div", "web-tech-stack");
            if (exp.techStackShort) {
                exp.techStackShort.split(",").forEach(t => {
                    const span = createEl("span", "web-tech-tag", t.trim());
                    tech.appendChild(span);
                });
            }

            const descDiv = createEl("div", "web-description");
            (exp.descriptionWeb || []).forEach(text => {
                const p = document.createElement("p");
                p.textContent = text;
                descDiv.appendChild(p);
            });

            item.appendChild(h3);
            item.appendChild(period);
            if (tech.childNodes.length) item.appendChild(tech);
            item.appendChild(descDiv);
            expDiv.appendChild(item);
        });
    }

    const projDiv = document.getElementById("web-projects-list");
    if (projDiv) {
        projDiv.innerHTML = "";
        CV.projects.forEach(pr => {
            const card = createEl("div", "web-project-card");
            const h3 = createEl("h3", "web-job-header", pr.name);
            const period = createEl("p", "web-job-period", pr.period);
            const tech = createEl("div", "web-tech-stack");
            if (pr.techStack) {
                pr.techStack.split(",").forEach(t => {
                    const span = createEl("span", "web-tech-tag", t.trim());
                    tech.appendChild(span);
                });
            }
            const desc = createEl("div", "web-description");
            const p = document.createElement("p");
            p.textContent = pr.descriptionWeb;
            desc.appendChild(p);

            card.appendChild(h3);
            card.appendChild(period);
            card.appendChild(tech);
            card.appendChild(desc);
            projDiv.appendChild(card);
        });
    }

    const skillsGrid = document.getElementById("web-skills-grid");
    if (skillsGrid) {
        skillsGrid.innerHTML = "";
        const mapping = [
            ["Backend Development", CV.skills.backend],
            ["DevOps & Cloud", CV.skills.devops],
            ["Database & Storage", CV.skills.database],
            ["Frontend & Web", CV.skills.frontend],
            ["Networking & Messaging", CV.skills.networking],
            ["Strumenti & Altro", CV.skills.tools]
        ];
        mapping.forEach(([title, list]) => {
            const cat = createEl("div", "web-skill-category");
            const h4 = createEl("h4", "web-skill-title", title);
            const div = createEl("div", "web-skill-list", list.join("; ") + ".");
            cat.appendChild(h4);
            cat.appendChild(div);
            skillsGrid.appendChild(cat);
        });
    }

    const eduDiv = document.getElementById("web-education-list");
    if (eduDiv) {
        eduDiv.innerHTML = "";
        CV.education.forEach(ed => {
            const item = createEl("div", "web-experience-item");
            const h3 = createEl("h3", "web-job-header", ed.title);
            const period = createEl(
                "p",
                "web-job-period",
                `${ed.period} · ${ed.institution} · ${ed.location}`
            );
            const desc = createEl("div", "web-description");
            const p = document.createElement("p");
            p.textContent = ed.details;
            desc.appendChild(p);

            item.appendChild(h3);
            item.appendChild(period);
            item.appendChild(desc);
            eduDiv.appendChild(item);
        });
    }

    const langDiv = document.getElementById("web-languages");
    if (langDiv) {
        langDiv.innerHTML = "";
        CV.languages.forEach(l => {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${l.name}</strong> – ${l.level}`;
            langDiv.appendChild(p);
        });
    }

    const otherDiv = document.getElementById("web-other-info");
    if (otherDiv) {
        otherDiv.innerHTML = "";
        const p1 = document.createElement("p");
        p1.innerHTML = "<strong>Patente di guida</strong>: B";
        otherDiv.appendChild(p1);
        const p2 = document.createElement("p");
        p2.style.marginTop = "0.75rem";
        p2.style.fontSize = "0.9rem";
        p2.textContent = CV.personal.consentText;
        otherDiv.appendChild(p2);
    }
}

/* STANDARD PRINT */
function renderPrint() {
    try {
        console.log("RenderPrint start");


        setSrc("print-photo", CV.personal.photo);
        setText("print-name", CV.personal.name.toUpperCase());
        setText("print-date-of-birth", CV.personal.dateOfBirth);
        setText("print-email", CV.personal.email);
        setText("print-phone", CV.personal.phone);
        setText("print-location", CV.personal.shortLocation);
        setText("print-linkedin", CV.personal.linkedin || "");
        setText("print-github", CV.personal.github || "");

        const expDiv = document.getElementById("print-experience-list");
        if (expDiv) {
            expDiv.innerHTML = "";
            CV.experience.forEach(exp => {
                const item = createEl("div", "print-experience-item");
                const header = createEl(
                    "div",
                    "print-job-header",
                    `${exp.role} – ${exp.company}`
                );
                const period = createEl(
                    "div",
                    "print-job-period",
                    `${exp.period} · ${exp.location}`
                );
                item.appendChild(header);
                item.appendChild(period);

                if (exp.techStackPrint) {
                    const tech = createEl("div", "print-tech-stack", exp.techStackPrint);
                    item.appendChild(tech);
                }
                (exp.descriptionPrint || []).forEach(text => {
                    const d = createEl("div", "print-description", text);
                    item.appendChild(d);
                });
                expDiv.appendChild(item);
            });
        }

        const skillsGrid = document.getElementById("print-skills-grid");
        if (skillsGrid) {
            skillsGrid.innerHTML = "";
            const mapping = [
                ["Backend Development", CV.skills.backend],
                ["DevOps & Cloud", CV.skills.devops],
                ["Database Storage", CV.skills.database],
                ["Frontend Development", CV.skills.frontend],
                ["Messaging & Networking", CV.skills.networking],
                ["Tools & Soft Skill", CV.skills.tools]
            ];
            mapping.forEach(([title, list]) => {
                const cat = createEl("div", "print-skill-category");
                const t = createEl("div", "print-skill-title", title);
                const div = createEl("div", null, list.join("; ") + ".");
                cat.appendChild(t);
                cat.appendChild(div);
                skillsGrid.appendChild(cat);
            });
        }

        const projDiv = document.getElementById("print-projects-list");
        if (projDiv) {
            projDiv.innerHTML = "";
            CV.projects.forEach(pr => {
                const item = createEl("div", "print-project-item");
                const header = createEl(
                    "div",
                    "print-job-header",
                    `${pr.name}`
                );
                const period = createEl("div", "print-job-period", pr.period);
                const tech = createEl("div", "print-tech-stack", pr.techStack);
                const desc = createEl("div", "print-description", pr.descriptionPrint);
                item.appendChild(header);
                item.appendChild(period);
                item.appendChild(tech);
                item.appendChild(desc);
                projDiv.appendChild(item);
            });
        }

        const eduDiv = document.getElementById("print-education-list");
        if (eduDiv) {
            eduDiv.innerHTML = "";
            CV.education.forEach(ed => {
                const item = createEl("div", "print-education-item");
                const h = createEl("div", "print-job-header", ed.title);
                const period = createEl(
                    "div",
                    "print-job-period",
                    `${ed.period} · ${ed.institution} · ${ed.location}`
                );
                const d = createEl("div", "print-description", ed.details);
                item.appendChild(h);
                item.appendChild(period);
                item.appendChild(d);
                eduDiv.appendChild(item);
            });
        }

        const langDiv = document.getElementById("print-languages");
        if (langDiv) {
            langDiv.innerHTML = "";
            CV.languages.forEach(l => {
                const p = document.createElement("div");
                p.textContent = `${l.name}: ${l.europass}`;
                langDiv.appendChild(p);
            });
        }

        const otherDiv = document.getElementById("print-other-info");
        if (otherDiv) {
            otherDiv.innerHTML = "";
            const p1 = document.createElement("div");
            p1.textContent = "Patente di guida: B";
            otherDiv.appendChild(p1);
        }

        setText("print-footer", CV.personal.consentText);
        console.log("✅ renderPrint() finita OK");
    } catch (error) {
        console.error("💥 ERRORE in renderPrint():", error);
    }
}

/* SHORT PRINT */
function renderShort() {
    setSrc("short-photo", CV.personal.photo);
    setText("short-name", CV.personal.name.toUpperCase());
    setText("short-title", CV.personal.titleShort);

    const contactGrid = document.getElementById("short-contact-grid");
    if (contactGrid) {
        contactGrid.innerHTML = "";
        [
            CV.personal.email,
            CV.personal.phone,
            CV.personal.shortLocation,
            CV.personal.dateOfBirth
        ].forEach(v => {
            if (!v) return;
            const span = document.createElement("span");
            span.textContent = v;
            contactGrid.appendChild(span);
        });
    }

    const expDiv = document.getElementById("short-experience-list");
    if (expDiv) {
        expDiv.innerHTML = "";
        CV.experience.forEach(exp => {
            const item = createEl("div", "experience-item");
            const title = createEl(
                "div",
                "job-title",
                `${exp.role} – ${exp.company}`
            );
            const period = createEl(
                "div",
                "job-period",
                `${exp.period} · ${exp.location}`
            );
            const tech = createEl("div", "tech-stack", exp.techStackShort || "");
            const desc = createEl("div", "description", exp.descriptionShort || "");
            item.appendChild(title);
            item.appendChild(period);
            if (exp.techStackShort) item.appendChild(tech);
            item.appendChild(desc);
            expDiv.appendChild(item);
        });
    }

    const skillsGrid = document.getElementById("short-skills-grid");
    if (skillsGrid) {
        skillsGrid.innerHTML = "";
        const mapping = [
            ["Backend & API", CV.skills.backend],
            ["DevOps & Cloud", CV.skills.devops],
            ["Database Storage", CV.skills.database],
            ["Frontend", CV.skills.frontend],
            ["Messaging & Networking", CV.skills.networking],
            ["Strumenti & Soft Skill", CV.skills.tools]
        ];
        mapping.forEach(([title, list]) => {
            const cat = createEl("div", "skill-category");
            const t = createEl("div", "skill-title", title);
            const l = createEl("div", "skill-list", list.join("; ") + ".");
            cat.appendChild(t);
            cat.appendChild(l);
            skillsGrid.appendChild(cat);
        });
    }

    const projDiv = document.getElementById("short-projects-list");
    if (projDiv) {
        projDiv.innerHTML = "";
        CV.projects.forEach(pr => {
            const item = createEl("div", "project-item");
            const title = createEl("div", "project-title", pr.name);
            const period = createEl("div", "project-period", pr.techStack);
            const desc = createEl("div", "description", pr.descriptionShort);
            item.appendChild(title);
            item.appendChild(period);
            item.appendChild(desc);
            projDiv.appendChild(item);
        });
    }

    const eduDiv = document.getElementById("short-education-list");
    if (eduDiv) {
        eduDiv.innerHTML = "";
        CV.education.forEach(ed => {
            const item = createEl("div", "education-item");
            const title = createEl("div", "job-title", ed.title);
            const period = createEl(
                "div",
                "job-period",
                `${ed.period} · ${ed.institution} · ${ed.location}`
            );
            const desc = createEl("div", "description", ed.details);
            item.appendChild(title);
            item.appendChild(period);
            item.appendChild(desc);
            eduDiv.appendChild(item);
        });
    }

    const keyDiv = document.getElementById("short-key-skills");
    if (keyDiv) {
        keyDiv.innerHTML = "";
        CV.keySkillsShort.forEach(k => {
            const d = document.createElement("div");
            d.style.marginBottom = "6px";
            d.innerHTML = `<strong>${k.title}</strong> ${k.text}`;
            keyDiv.appendChild(d);
        });
    }

    const certDiv = document.getElementById("short-certifications");
    if (certDiv) {
        certDiv.innerHTML = "";
        if (!CV.certifications.length) {
            certDiv.textContent = "Al momento nessuna certificazione formale registrata.";
        } else {
            CV.certifications.forEach(c => {
                const d = document.createElement("div");
                d.textContent = `${c.year} – ${c.name}`;
                certDiv.appendChild(d);
            });
        }
    }

    const langDiv = document.getElementById("short-languages");
    if (langDiv) {
        langDiv.innerHTML = "";
        CV.languages.forEach(l => {
            const d = document.createElement("div");
            d.innerHTML = `<strong>${l.name}</strong> – ${l.level}`;
            langDiv.appendChild(d);
        });
    }

    setText("short-footer", CV.personal.consentText);
}

/* EUROPASS */
function renderEuropass() {
    setSrc("europass-photo", CV.personal.photo);
    setText("europass-name", CV.personal.name.toUpperCase());
    setText("europass-title", CV.personal.titleEuropass);

    const contactGrid = document.getElementById("europass-contact-grid");
    if (contactGrid) {
        contactGrid.innerHTML = "";
        [
            CV.personal.email,
            CV.personal.phone,
            CV.personal.shortLocation,
            CV.personal.dateOfBirth,
            CV.personal.linkedin,
            CV.personal.github
        ].forEach(v => {
            if (!v) return;
            const div = document.createElement("div");
            div.textContent = v;
            contactGrid.appendChild(div);
        });
    }

    const expDiv = document.getElementById("europass-experience-list");
    if (expDiv) {
        expDiv.innerHTML = "";
        CV.experience.forEach(exp => {
            const entry = createEl("div", "europass-entry");
            const dates = createEl("div", "europass-dates", exp.europassDates);
            const content = createEl("div", "europass-content");
            const jobTitle = createEl(
                "div",
                "europass-job-title",
                exp.role
            );
            const org = createEl(
                "div",
                "europass-organization",
                `${exp.company}, ${exp.location}`
            );
            const desc = createEl(
                "div",
                "europass-description",
                (exp.descriptionPrint || []).join(" ")
            );

            content.appendChild(jobTitle);
            content.appendChild(org);
            content.appendChild(desc);
            entry.appendChild(dates);
            entry.appendChild(content);
            expDiv.appendChild(entry);
        });
    }

    const eduDiv = document.getElementById("europass-education-list");
    if (eduDiv) {
        eduDiv.innerHTML = "";
        CV.education.forEach(ed => {
            const entry = createEl("div", "europass-entry");
            const dates = createEl("div", "europass-dates", ed.europassDates);
            const content = createEl("div", "europass-content");
            const jobTitle = createEl(
                "div",
                "europass-job-title",
                ed.title
            );
            const org = createEl(
                "div",
                "europass-organization",
                `${ed.institution}, ${ed.location}`
            );
            const desc = createEl(
                "div",
                "europass-description",
                ed.details
            );

            content.appendChild(jobTitle);
            content.appendChild(org);
            content.appendChild(desc);
            entry.appendChild(dates);
            entry.appendChild(content);
            eduDiv.appendChild(entry);
        });
    }

    const langDiv = document.getElementById("europass-languages");
    if (langDiv) {
        langDiv.innerHTML = "";
        CV.languages.forEach(l => {
            const d = document.createElement("div");
            d.textContent = `${l.name}: ${l.europass}`;
            langDiv.appendChild(d);
        });
    }

    const digitalDiv = document.getElementById("europass-digital-skills");
    if (digitalDiv) {
        digitalDiv.innerHTML = "";
        const all = []
            .concat(CV.skills.backend)
            .concat(CV.skills.devops)
            .concat(CV.skills.database)
            .concat(CV.skills.frontend)
            .concat(CV.skills.networking)
            .concat(CV.skills.tools);
        const p = document.createElement("div");
        p.textContent = all.join("; ") + ".";
        digitalDiv.appendChild(p);
    }

    setText("europass-footer", CV.personal.consentText);
}

/* PRINT HANDLER */
function printCV(type) {
    document.body.classList.remove("print-standard", "print-short", "print-europass");
    if (type === "standard") {
        renderPrint();
        document.body.classList.add("print-standard");
    } else if (type === "short") {
        document.body.classList.add("print-short");
    } else if (type === "europass") {
        document.body.classList.add("print-europass");
    }
    window.print();
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
    renderWeb();
    renderPrint();
    renderShort();
    renderEuropass();
});
