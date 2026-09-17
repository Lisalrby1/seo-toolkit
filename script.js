/* =========================================
   TOOL NAVIGATION
========================================= */

function showTool(toolId, button) {

    const sections = document.querySelectorAll(".tool-section");

    sections.forEach(function(section) {
        section.classList.remove("active-tool");
    });


    const selectedTool = document.getElementById(toolId);

    if (selectedTool) {
        selectedTool.classList.add("active-tool");
    }


    const buttons = document.querySelectorAll(".nav-button");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });


    if (button) {
        button.classList.add("active");
    }

}


/* =========================================
   WORD COUNTER
========================================= */

function updateWordCounter() {

    const text = document.getElementById("wordText").value;


    /*
        Word count
    */

    const trimmedText = text.trim();

    let words = 0;

    if (trimmedText.length > 0) {
        words = trimmedText.split(/\s+/).length;
    }


    /*
        Character count
    */

    const characters = text.length;


    /*
        Characters without spaces
    */

    const withoutSpaces = text.replace(/\s/g, "").length;


    /*
        Sentence count
    */

    let sentences = 0;

    if (trimmedText.length > 0) {

        const sentenceMatches =
            trimmedText.match(/[.!?]+(?=\s|$)/g);

        sentences = sentenceMatches
            ? sentenceMatches.length
            : 1;
    }


    /*
        Paragraph count
    */

    let paragraphs = 0;

    if (trimmedText.length > 0) {

        paragraphs = trimmedText
            .split(/\n\s*\n/)
            .filter(function(paragraph) {
                return paragraph.trim() !== "";
            })
            .length;

        if (paragraphs === 0) {
            paragraphs = 1;
        }
    }


    /*
        Display results
    */

    document.getElementById("wordCount").textContent = words;

    document.getElementById("characterCount").textContent =
        characters;

    document.getElementById("characterNoSpace").textContent =
        withoutSpaces;

    document.getElementById("sentenceCount").textContent =
        sentences;

    document.getElementById("paragraphCount").textContent =
        paragraphs;

}


/* =========================================
   CLEAR WORD COUNTER
========================================= */

function clearWordCounter() {

    document.getElementById("wordText").value = "";

    updateWordCounter();

}


/* =========================================
   KEYWORD DENSITY
========================================= */

function checkKeywordDensity() {

    const content =
        document.getElementById("keywordText").value;

    const keyword =
        document.getElementById("targetKeyword").value.trim();


    document.getElementById("keywordResultText").textContent =
        keyword || "-";


    if (!content.trim() || !keyword) {

        document.getElementById("keywordOccurrences")
            .textContent = "0";

        document.getElementById("keywordDensity")
            .textContent = "0%";

        document.getElementById("densityMessage")
            .textContent =
            "Enter your content and target keyword.";

        return;
    }


    /*
        Count words in content
    */

    const words = content
        .trim()
        .split(/\s+/);


    /*
        Normalize text
    */

    const normalizedContent =
        content.toLowerCase();


    const normalizedKeyword =
        keyword.toLowerCase();


    /*
        Escape special regex characters
    */

    const escapedKeyword =
        normalizedKeyword.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );


    /*
        Count exact keyword phrase occurrences
    */

    const regex =
        new RegExp(
            "(?<![\\w])" +
            escapedKeyword +
            "(?![\\w])",
            "gi"
        );


    const matches =
        normalizedContent.match(regex);


    const occurrences =
        matches ? matches.length : 0;


    /*
        Calculate density

        Keyword density =
        keyword occurrences / total words × 100
    */

    const density =
        (occurrences / words.length) * 100;


    const roundedDensity =
        density.toFixed(2);


    document.getElementById("keywordOccurrences")
        .textContent = occurrences;


    document.getElementById("keywordDensity")
        .textContent = roundedDensity + "%";


    /*
        Message
    */

    let message = "";

    if (occurrences === 0) {

        message =
            "The keyword was not found in the content.";

    } else if (density < 1) {

        message =
            "The keyword appears less frequently in this content.";

    } else if (density <= 3) {

        message =
            "The keyword is present at a moderate frequency.";

    } else {

        message =
            "The keyword appears frequently. Review the content naturally and avoid keyword stuffing.";

    }


    document.getElementById("densityMessage")
        .textContent = message;

}


/* =========================================
   META TITLE CHECKER
========================================= */

function checkMetaTitle() {

    const title =
        document.getElementById("metaTitle").value;


    const length = title.length;


    document.getElementById("titleCharacters")
        .textContent = length;


    /*
        Update preview
    */

    document.getElementById("previewTitle")
        .textContent =
        title || "Your Meta Title";


    /*
        Status
    */

    const status =
        document.getElementById("titleStatus");


    if (length === 0) {

        status.className = "status neutral";

        status.textContent =
            "Enter a title to check it.";

    }

    else if (length <= 30) {

        status.className = "status warning";

        status.textContent =
            "Your title is quite short. Consider adding more useful context.";

    }

    else if (length <= 60) {

        status.className = "status good";

        status.textContent =
            "Good title length. Your title is within a commonly recommended range.";

    }

    else if (length <= 70) {

        status.className = "status warning";

        status.textContent =
            "Your title is getting long and may be truncated in some search displays.";

    }

    else {

        status.className = "status bad";

        status.textContent =
            "Your title is quite long and may be truncated in search results.";

    }

}


/* =========================================
   META DESCRIPTION CHECKER
========================================= */

function checkMetaDescription() {

    const description =
        document.getElementById("metaDescription").value;


    const length =
        description.length;


    document.getElementById("descriptionCharacters")
        .textContent = length;


    /*
        Update preview
    */

    document.getElementById("previewDescription")
        .textContent =
        description ||
        "Your meta description preview will appear here.";


    /*
        Status
    */

    const status =
        document.getElementById("descriptionStatus");


    if (length === 0) {

        status.className = "status neutral";

        status.textContent =
            "Enter a description to check it.";

    }

    else if (length < 100) {

        status.className = "status warning";

        status.textContent =
            "Your description is relatively short. Consider providing more useful information.";

    }

    else if (length <= 160) {

        status.className = "status good";

        status.textContent =
            "Good description length. Remember that search snippets can vary.";

    }

    else if (length <= 180) {

        status.className = "status warning";

        status.textContent =
            "Your description is getting long and may be truncated.";

    }

    else {

        status.className = "status bad";

        status.textContent =
            "Your description is quite long and may be truncated in search results.";

    }

}


/* =========================================
   SEO SLUG GENERATOR
========================================= */

function generateSlug() {

    const input =
        document.getElementById("slugInput").value;


    let slug = input.toLowerCase();


    /*
        Remove accents
    */

    slug = slug.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");


    /*
        Remove special characters
    */

    slug = slug.replace(/[^a-z0-9\s-]/g, "");


    /*
        Replace spaces with hyphens
    */

    slug = slug.replace(/\s+/g, "-");


    /*
        Remove duplicate hyphens
    */

    slug = slug.replace(/-+/g, "-");


    /*
        Remove hyphens from beginning/end
    */

    slug = slug.replace(/^-+|-+$/g, "");


    document.getElementById("slugOutput")
        .value = slug;

}


/* =========================================
   COPY SLUG
========================================= */

function copySlug() {

    const slug =
        document.getElementById("slugOutput").value;


    if (!slug) {

        document.getElementById("copyMessage")
            .textContent =
            "Generate a slug first.";

        return;
    }


    navigator.clipboard.writeText(slug)
        .then(function() {

            document.getElementById("copyMessage")
                .textContent =
                "Slug copied successfully.";

        })
        .catch(function() {

            document.getElementById("copyMessage")
                .textContent =
                "Unable to copy automatically.";

        });

}
