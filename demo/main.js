window.onload = showThemColors();


function showThemColors() {
    var counter = 0;
    var rfx1 = document.querySelector('#rfx1');
    var rfx2 = document.querySelector('#rfx2');
    var rfx3 = document.querySelector('#rfx3');
    var rfx4 = document.querySelector('#rfx4');
    var btn1 = document.querySelectorAll('#rev-trigger-1')[0];
    var btn2 = document.querySelectorAll('#rev-trigger-2')[0];
    var btn3 = document.querySelectorAll('#rev-trigger-3')[0];
    var btn4 = document.querySelectorAll('#rev-trigger-4')[0];
    var btn5 = document.querySelectorAll('#rev-trigger-5')[0];
    var btn6 = document.querySelectorAll('#rev-trigger-6')[0];
    var btn7 = document.querySelectorAll('#rev-trigger-7')[0];
    var btn8 = document.querySelectorAll('#rev-trigger-8')[0];
    var btn9 = document.querySelectorAll('#rev-trigger-9')[0];
    var btn10 = document.querySelectorAll('#rev-trigger-10')[0];
    var btn11 = document.querySelectorAll('#rev-trigger-11')[0];
    var btn12 = document.querySelectorAll('#rev-trigger-12')[0];
   
    
    var revealSettings = {
        bgColors: ['#111'],
        duration: 600,
        delay: 100,
        direction: 'lr',
        onStart: function (contentEl, revealerEl) {
        },
        onHalfway: function (contentEl, revealerEl) {
            contentEl.style.opacity = 1;
        },
        onComplete: function () {
            revealerEffect2.reveal();
        }
    };
    var revealSettings2 = {
        bgColors: ['#111'],
        duration: 400,
        delay: 100,
        direction: 'lr',
        onHalfway: function (contentEl, revealerEl) {
            contentEl.style.opacity = 1;
        }
    };
    var revealSettings3 = {
        bgColors: ['#FFB900','#FF8C00','#F7630C','#E74856','#E81123','#0078D7','#0063B1'],
        duration: 400,
        delay: 100,
        direction: 'lr',
        onStart: function (contentEl, revealerEl) {
            anime.remove(contentEl);
            //  contentEl.style.opacity = 0;
        },
        onHalfway: function (contentEl, revealerEl) {
            contentEl.style.opacity = 1;
        }
    };


    var revealerEffect = new RevealFx(rfx1, {
        layers: 1,
        isContentHidden:false,
        revealSettings: revealSettings
    });
    var revealerEffect2 = new RevealFx(rfx2, {
        layers: 1,
        isContentHidden : true,
        revealSettings: revealSettings2
    });

    var splitContent = document.querySelector('.dual__content'),
    revealEffect3 = new RevealFx(rfx3, {
        isContentHidden:true,
        layers:4,
        revealSettings : {
            bgColors: ['#2c2c38','#2c2c38','#2c2c38','#2c2c38'],
            direction: 'rl',
            duration: 800,
            easing: 'easeInOutCirc',
            coverArea: 50,
            onStart: function(contentEl)
            {
                contentEl.style.opacity =0;
                splitContent.classList.remove('dual__content--show');
            },
            onHalfway: function(contentEl, revealerEl) {
                contentEl.style.opacity = 1;
                splitContent.classList.add('dual__content--show');
            }
        }
    });
    var revealerEffect4 = new RevealFx(rfx4, {
        layers: 7,
        isContentHidden : true,
        revealSettings: revealSettings3
    });
    

    revealerEffect.reveal();
    revealEffect3.reveal();
    revealerEffect4.reveal();

    btn1.onclick = function(){
        revealSettings.direction = 'lr';
        revealSettings2.direction = 'lr';
        revealerEffect.reveal(revealSettings);
    }
    btn2.onclick = function() {
        revealSettings.direction = 'rl';
        revealSettings2.direction = 'rl';
        revealerEffect.reveal(revealSettings);
    }
    btn3.onclick = function() {
        revealSettings.direction = 'tb';
        revealSettings2.direction = 'tb';
        revealerEffect.reveal(revealSettings);
    }
    btn4.onclick = function() {
        revealSettings.direction = 'bt';
        revealSettings2.direction = 'bt';
        revealerEffect.reveal(revealSettings);
    }
    btn5.onclick = function() {
      
      revealSettings.bgColors[0] = '#283593';
      revealSettings2.bgColors[0] = '#FBC02D';
      revealerEffect.reveal(revealSettings);
    }
    btn6.onclick = function(){
       revealEffect3.reveal();
    }
    btn7.onclick = function(){
        revealSettings3.coverArea = Math.random(1)*100+10;
        revealSettings3.onComplete = function(contentEl,revealEl){
            btn7.innerText = 'cover area has changed to '+revealSettings3.coverArea+'%';
        }
        revealerEffect4.reveal(revealSettings3);
    }
    btn8.onclick = function()
    {
        revealSettings3 = resetTheSetting();
        revealSettings3.duration = Math.random(1)*1000 + 1000;
        revealerEffect4.reveal(revealSettings3);
    }
    btn9.onclick = function()
    {
        revealSettings3 = resetTheSetting()
        revealSettings3.delay = Math.random(1)*100 + 200;
        revealerEffect4.reveal(revealSettings3);
    }
    btn10.onclick = function()
    {
        var quotations = ['Inhale confidence,exhale doubts','Do it or watch yourself sad when others show it','Be yourself,because everyone else is taken'];
        
        revealSettings3 = resetTheSetting()
        revealSettings3.onHalfway =  function(contentEl)
        {
            contentEl.innerText = quotations[counter++];
        }
        if(counter>quotations.length-1)
        counter = 0;
        revealerEffect4.reveal(revealSettings3);
    }
    btn12.onclick = function() {
        revealSettings3 = resetTheSetting();
        var resetRevealSettings = resetTheSetting();
        revealerEffect4.reveal(resetRevealSettings);
    }
    btn11.onclick = function() {
        revealSettings3 = resetTheSetting();
        revealSettings3.easing = 'cubicBezier(0.000, 0.810, 0.230, 0.990)';
        revealerEffect4.reveal(revealSettings3);
    }
    resetTheSetting = function()
    {
        return {
            bgColors: ['#FFB900','#FF8C00','#F7630C','#E74856','#E81123','#0078D7','#0063B1'],
            duration: 400,
            delay: 100,
            direction: 'lr',
            onStart: function (contentEl, revealerEl) {
                anime.remove(contentEl);
                //  contentEl.style.opacity = 0;
            },
            onHalfway: function (contentEl, revealerEl) {
                contentEl.style.opacity = 1;
            }
        }
    }
}

