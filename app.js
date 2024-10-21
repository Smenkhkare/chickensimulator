document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('quoteCanvas');
    const ctx = canvas.getContext('2d');
    const imageUploader = document.getElementById('imageUploader');
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    const randomizeButton = document.getElementById('randomizeButton');
    
    let uploadedImage;
    const logoImage = new Image(); 
    logoImage.src = 'logo.png'; 

    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" }
    ];

    const images = [
        'image1.jpg', 
        'image2.jpg',
        'image3.jpg'
    ];

    logoImage.onload = function() {
        drawImageWithQuote();
    };

    const drawImageWithQuote = () => {
        if (!uploadedImage) return; 

        const canvasWidth = 850;
        const imageSectionWidth = 300;
        const textSectionWidth = 550;
        const imgHeight = 400;

        canvas.width = canvasWidth;
        canvas.height = imgHeight;
        
        const imageAspectRatio = uploadedImage.width / uploadedImage.height;
        const sectionAspectRatio = imageSectionWidth / imgHeight;

        let sx, sy, swidth, sheight; 

        if (imageAspectRatio > sectionAspectRatio) {
            sheight = uploadedImage.height;
            swidth = sheight * sectionAspectRatio; 
            sx = (uploadedImage.width - swidth) / 2;
            sy = 0;
        } else {
            swidth = uploadedImage.width;
            sheight = swidth / sectionAspectRatio; 
            sx = 0;
            sy = (uploadedImage.height - sheight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(uploadedImage, sx, sy, swidth, sheight, 0, 0, imageSectionWidth, imgHeight);

        ctx.fillStyle = 'black';
        ctx.fillRect(imageSectionWidth, 0, textSectionWidth, imgHeight);
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.strokeRect(0, 0, imageSectionWidth + textSectionWidth, imgHeight);
		
		ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, imageSectionWidth + textSectionWidth, imgHeight);
        
        const quoteText = quoteInput.value;
        ctx.font = '300 28px "Open Sans"';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        
        const wrapText = (text, x, y, maxWidth, lineHeight) => {
            const words = text.split(' ');
            let line = '';
            let lines = [];
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
            return lines;
        };
        
        const quoteX = imageSectionWidth + textSectionWidth / 2;
        const wrappedLines = wrapText(quoteText, quoteX, 0, textSectionWidth - 40, 42);
        
        const lineHeight = 42;
        const totalTextHeight = wrappedLines.length * lineHeight;
        let quoteY = (imgHeight - totalTextHeight) / 2 - 26;

        wrappedLines.forEach(line => {
            ctx.fillText(line, quoteX, quoteY);
            quoteY += lineHeight;
        });

        const rightText = `—  `;
        const leftText = `  —`;
        const authorText = `${authorInput.value}`;
		const authY = quoteY + 18
        
        var textWidth = ctx.measureText(authorText).width;

        ctx.fillStyle = "#b7b7b7";
        
        ctx.font = '24px "Open Sans"';
        ctx.fillText(leftText, quoteX - textWidth / 2.8 - 25, authY);
        
        ctx.font = '24px "Satisfy"';
        ctx.fillText(authorText, quoteX, authY, textSectionWidth - 20);
        
        ctx.font = 'italic 24px "Open Sans"';
        ctx.fillText(rightText, quoteX + textWidth / 2.8 + 25, authY);

        const logoWidth = 100; 
        const logoHeight = (logoWidth / logoImage.width) * logoImage.height; 
        ctx.drawImage(logoImage, quoteX - logoWidth / 2, canvas.height - logoHeight - 20, logoWidth, logoHeight);
    };

    imageUploader.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                uploadedImage = img;
                drawImageWithQuote();
            };
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    quoteInput.addEventListener('input', drawImageWithQuote);
    authorInput.addEventListener('input', drawImageWithQuote);

    randomizeButton.addEventListener('click', function() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const randomImageSrc = images[Math.floor(Math.random() * images.length)];

        quoteInput.value = randomQuote.text;
        authorInput.value = randomQuote.author;

        const img = new Image();
        img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/46_Dick_Cheney_3x4.jpg/1200px-46_Dick_Cheney_3x4.jpg';
        img.onload = function() {
            uploadedImage = img;
            drawImageWithQuote();
        };
    });
	

	async function getWikipediaImage(url) {
		try {
			// Fetch the Wikipedia page
			const response = await fetch(url);
			
			// Check if the response is ok (status code 200)
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			
			// Get the text of the response
			const text = await response.text();
			
			// Create a DOM parser to parse the HTML
			const parser = new DOMParser();
			const doc = parser.parseFromString(text, 'text/html');
			
			// Find the og:image tag
			const ogImageTag = doc.querySelector('meta[property="og:image"]');
			
			// Return the content attribute of the og:image tag
			return ogImageTag ? ogImageTag.getAttribute('content') : null;
		} catch (error) {
			console.error('Error fetching image:', error);
			return null;
		}
	}

	// Example usage
	getWikipediaImage('https://en.wikipedia.org/wiki/Dick_Cheney')
		.then(imageUrl => {
			if (imageUrl) {
				console.log('Image URL:', imageUrl);
			} else {
				console.log('og:image tag not found');
			}
	});


	
});
