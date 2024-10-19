document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('quoteCanvas');
    const ctx = canvas.getContext('2d');
    const imageUploader = document.getElementById('imageUploader');
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    const downloadLink = document.getElementById('downloadLink');

    let uploadedImage;
    const logoImage = new Image(); // Create a new Image object for the logo
    logoImage.src = 'logo.png';  // Set the source for the logo image

    // Wait for the logo to load before allowing drawing
    logoImage.onload = function() {
        drawImageWithQuote(); // Draw the image with the logo after it loads
    };

    // Function to draw image and text on canvas
    const drawImageWithQuote = () => {
        if (!uploadedImage) return;  // Only proceed if an image is uploaded

        const canvasWidth = 850;
        const imageSectionWidth = 300;
        const textSectionWidth = 550;
        const imgHeight = 400;

        // Set canvas dimensions
        canvas.width = canvasWidth;
        canvas.height = imgHeight;
        
        // Calculate the aspect ratio of the uploaded image
        const imageAspectRatio = uploadedImage.width / uploadedImage.height;
        const sectionAspectRatio = imageSectionWidth / imgHeight;

        let sx, sy, swidth, sheight; // Variables for source cropping

        // If the image's aspect ratio is greater than the section's, crop the width
        if (imageAspectRatio > sectionAspectRatio) {
            sheight = uploadedImage.height;
            swidth = sheight * sectionAspectRatio; // Scale the width to match the section's aspect ratio
            sx = (uploadedImage.width - swidth) / 2; // Center the crop horizontally
            sy = 0; // No vertical cropping
        } else {
            swidth = uploadedImage.width;
            sheight = swidth / sectionAspectRatio; // Scale the height to match the section's aspect ratio
            sx = 0; // No horizontal cropping
            sy = (uploadedImage.height - sheight) / 2; // Center the crop vertically
        }

        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the uploaded image on the left side
        ctx.drawImage(uploadedImage, sx, sy, swidth, sheight, 0, 0, imageSectionWidth, imgHeight);

        // Draw the black background on the right side
        ctx.fillStyle = 'black';
        ctx.fillRect(imageSectionWidth, 0, textSectionWidth, imgHeight);
        
        // Draw a white border around the image
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeRect(0, 0, imageSectionWidth + textSectionWidth, imgHeight);
		
		// Draw a black border around the image
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, imageSectionWidth + textSectionWidth, imgHeight);
        
        // Add the quote text on the right side
        const quoteText = quoteInput.value;
        ctx.font = '300 28px "Open Sans"';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        
        // Function to wrap text
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
            lines.push(line); // Add the last line
            return lines;
        };
        
        const quoteX = imageSectionWidth + textSectionWidth / 2;
        const wrappedLines = wrapText(quoteText, quoteX, 0, textSectionWidth - 40, 42);
        
        // Calculate total height of the quote text to center it vertically
        const lineHeight = 42;
        const totalTextHeight = wrappedLines.length * lineHeight;
        let quoteY = (imgHeight - totalTextHeight) / 2 - 26;

        // Draw each line of the wrapped text
        wrappedLines.forEach(line => {
            ctx.fillText(line, quoteX, quoteY);
            quoteY += lineHeight;
        });

		
		// Add the author below the quote
        const rightText = `—  `;
        const leftText = `  —`;
        const authorText = `${authorInput.value}`;
		const authY = quoteY + 18
        
        // Measure author width
        var textWidth = ctx.measureText(authorText).width;

        // Change fonts between dashes and author text
        ctx.fillStyle = "#b7b7b7";
        
        ctx.font = '24px "Open Sans"';
        ctx.fillText(leftText, quoteX - textWidth / 2.8 - 25, authY);
        
        ctx.font = '24px "Satisfy"';
        ctx.fillText(authorText, quoteX, authY, textSectionWidth - 20);
        
        ctx.font = 'italic 24px "Open Sans"';
        ctx.fillText(rightText, quoteX + textWidth / 2.8 + 25, authY);
		
		
		
        // Draw the logo
        const logoWidth = 100; // Set the desired logo width
        const logoHeight = (logoWidth / logoImage.width) * logoImage.height; // Maintain aspect ratio
        ctx.drawImage(logoImage, quoteX - logoWidth / 2, canvas.height - logoHeight - 20, logoWidth, logoHeight); // Draw logo
		
    };

    // Handle image upload and draw it on the canvas
    imageUploader.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                uploadedImage = img;
                drawImageWithQuote(); // Draw the image and text on the canvas
            };
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // Update canvas in real-time when the quote is typed
    quoteInput.addEventListener('input', drawImageWithQuote);

    // Update canvas in real-time when the author is typed
    authorInput.addEventListener('input', drawImageWithQuote);
 
});
