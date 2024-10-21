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

    const quotes = [{"text":"Whatever the mind of man can conceive and believe, it can achieve.","author":"Napoleon Hill"},{"text":"Strive not to be a success, but rather to be of value.","author":"Albert Einstein"},{"text":"Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.","author":"Robert Frost"},{"text":"I attribute my success to this: I never gave or took any excuse.","author":"Florence Nightingale"},{"text":"You miss 100% of the shots you don’t take.","author":"Wayne Gretzky"},{"text":"I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.","author":"Michael Jordan"},{"text":"The most difficult thing is the decision to act, the rest is merely tenacity.","author":"Amelia Earhart"},{"text":"Every strike brings me closer to the next home run.","author":"Babe Ruth"},{"text":"Definiteness of purpose is the starting point of all achievement.","author":"W. Clement Stone"},{"text":"Life is what happens to you while you’re busy making other plans.","author":"John Lennon"},{"text":"Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.","author":"Mark Twain"},{"text":"The most common way people give up their power is by thinking they don’t have any.","author":"Alice Walker"},{"text":"The mind is everything. What you think you become.","author":"Buddha"},{"text":"An unexamined life is not worth living.","author":"Socrates"},{"text":"Eighty percent of success is showing up.","author":"Woody Allen"},{"text":"Your time is limited, so don’t waste it living someone else’s life.","author":"Steve Jobs"},{"text":"Winning isn’t everything, but wanting to win is.","author":"Vince Lombardi"},{"text":"I am not a product of my circumstances. I am a product of my decisions.","author":"Stephen Covey"},{"text":"Every child is an artist.  The problem is how to remain an artist once he grows up.","author":"Pablo Picasso"},{"text":"You can never cross the ocean until you have the courage to lose sight of the shore.","author":"Christopher Columbus"},{"text":"I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.","author":"Maya Angelou"},{"text":"Whether you think you can or you think you can’t, you’re right.","author":"Henry Ford"},{"text":"The two most important days in your life are the day you are born and the day you find out why.","author":"Mark Twain"},{"text":"The best revenge is massive success.","author":"Frank Sinatra"},{"text":"People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.","author":"Zig Ziglar"},{"text":"Life shrinks or expands in proportion to one’s courage.","author":"Anais Nin"},{"text":"If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.","author":"Vincent Van Gogh"},{"text":"There is only one way to avoid criticism: do nothing, say nothing, and be nothing.","author":"Aristotle"},{"text":"The only person you are destined to become is the person you decide to be.","author":"Ralph Waldo Emerson"},{"text":"Go confidently in the direction of your dreams.  Live the life you have imagined.","author":"Henry David Thoreau"},{"text":"Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.","author":"Booker T. Washington"},{"text":"Certain things catch your eye, but pursue only those that capture the heart.","author":" Ancient Indian Proverb"},{"text":"Everything you’ve ever wanted is on the other side of fear.","author":"George Addair"},{"text":"We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.","author":"Plato"},{"text":"Teach thy tongue to say, “I do not know,” and thous shalt progress.","author":"Maimonides"},{"text":"Start where you are. Use what you have.  Do what you can.","author":"Arthur Ashe"},{"text":"When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.","author":"Helen Keller"},{"text":"Everything has beauty, but not everyone can see.","author":"Confucius"},{"text":"How wonderful it is that nobody need wait a single moment before starting to improve the world.","author":"Anne Frank"},{"text":"When I let go of what I am, I become what I might be.","author":"Lao Tzu"},{"text":"Life is not measured by the number of breaths we take, but by the moments that take our breath away.","author":"Maya Angelou"},{"text":"Happiness is not something readymade.  It comes from your own actions.","author":"Dalai Lama"},{"text":"If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.","author":"Sheryl Sandberg"},{"text":"First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.","author":"Aristotle"},{"text":"If the wind will not serve, take to the oars.","author":"Latin Proverb"},{"text":"We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.","author":"Marie Curie"},{"text":"Too many of us are not living our dreams because we are living our fears.","author":"Les Brown"},{"text":"If you want to lift yourself up, lift up someone else.","author":"Booker T. Washington"},{"text":"I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.","author":"Leonardo da Vinci"},{"text":"You take your life in your own hands, and what happens? A terrible thing, no one to blame.","author":"Erica Jong"},{"text":"I didn’t fail the test. I just found 100 ways to do it wrong.","author":"Benjamin Franklin"},{"text":"In order to succeed, your desire for success should be greater than your fear of failure.","author":"Bill Cosby"},{"text":"A person who never made a mistake never tried anything new.","author":" Albert Einstein"},{"text":"The person who says it cannot be done should not interrupt the person who is doing it.","author":"Chinese Proverb"},{"text":"There are no traffic jams along the extra mile.","author":"Roger Staubach"},{"text":"It is never too late to be what you might have been.","author":"George Eliot"},{"text":"I would rather die of passion than of boredom.","author":"Vincent van Gogh"},{"text":"It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.","author":"Ann Landers"},{"text":"If you want your children to turn out well, spend twice as much time with them, and half as much money.","author":"Abigail Van Buren"},{"text":"The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at.","author":"Jesse Owens"},{"text":"I have learned over the years that when one’s mind is made up, this diminishes fear.","author":"Rosa Parks"},{"text":"It does not matter how slowly you go as long as you do not stop.","author":"Confucius"},{"text":"Remember that not getting what you want is sometimes a wonderful stroke of luck.","author":"Dalai Lama"},{"text":"You can’t use up creativity.  The more you use, the more you have.","author":"Maya Angelou"},{"text":"Our lives begin to end the day we become silent about things that matter.","author":"Martin Luther King Jr."},{"text":"Do what you can, where you are, with what you have.","author":"Teddy Roosevelt"},{"text":"If you do what you’ve always done, you’ll get what you’ve always gotten.","author":"Tony Robbins"},{"text":"Dreaming, after all, is a form of planning.","author":"Gloria Steinem"},{"text":"It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.","author":"Mae Jemison"},{"text":"You may be disappointed if you fail, but you are doomed if you don’t try.","author":"Beverly Sills"},{"text":"Remember no one can make you feel inferior without your consent.","author":"Eleanor Roosevelt"},{"text":"Life is what we make it, always has been, always will be.","author":"Grandma Moses"},{"text":"The question isn’t who is going to let me; it’s who is going to stop me.","author":"Ayn Rand"},{"text":"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.","author":"Henry Ford"},{"text":"It’s not the years in your life that count. It’s the life in your years.","author":"Abraham Lincoln"},{"text":"Change your thoughts and you change your world.","author":"Norman Vincent Peale"},{"text":"Either write something worth reading or do something worth writing.","author":"Benjamin Franklin"},{"text":"Nothing is impossible, the word itself says, “I’m possible!”","author":"–Audrey Hepburn"},{"text":"The only way to do great work is to love what you do.","author":"Steve Jobs"},{"text":"If you can dream it, you can achieve it.","author":"Zig Ziglar"}];

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

        quoteInput.value = randomQuote.text;
        authorInput.value = randomQuote.author;

        const img = new Image();
		fetchFirstWikipediaThumbnail(randomQuote.author).then(thumbnail => {
			console.log(thumbnail);
			img.src = thumbnail
		});
       
        img.onload = function() {
            uploadedImage = img;
            drawImageWithQuote();
        };
    });
	

	async function fetchFirstWikipediaThumbnail(searchTerm) {
		const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=20&origin=*`;

		try {
			const response = await fetch(url);
			const data = await response.json();

			// Check if the response contains pages
			if (data.query && data.query.pages && data.query.pages.length > 0) {
				// Get the first page
				const firstPage = data.query.pages[0];

				// Check if the thumbnail exists and return it
				if (firstPage.thumbnail) {
					return firstPage.thumbnail.source;
				} else {
					console.log("No thumbnail found for the first page");
					return null;
				}
			} else {
				console.log("No pages found");
				return null;
			}
		} catch (error) {
			console.error("Error fetching data from Wikipedia API:", error);
			return null;
		}
	}

	
});
