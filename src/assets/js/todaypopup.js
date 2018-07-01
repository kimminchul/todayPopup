

// 팝업
(function($){

    $.fn.popupEvent = function(option){

        //popup option
        var init = $.extend({
            idx:0,
            speed:2000,
            random:false,
            extendingElement:'header',
            Height:'0px',
            popHeight:'100px',
            interval:true,
            popupinfo:[
                {
                    imgUrl:'http://via.placeholder.com/1920x100',
                    alt:'sample text',
                    link:'http://www.naver.com',
                    target:'_self',
                    bgColor:'#CCC'
                }
            ],
            btnTitle:'오늘하루열지않음'
            },option);

        var $this = $(this);
        var elClassName = $this[0].classList[0];
        var slide_boolen = (init.popupinfo.length == 1 ) ?  false : true;
        var itervals = 'headler';

        var elementSet = function(){

            var elContainer = '';

            $.each(init.popupinfo,function(i,e){

                var link = init.popupinfo[i].link;
                var imgurl = init.popupinfo[i].imgUrl;
                var alt = init.popupinfo[i].alt;
                var target = init.popupinfo[i].target;
                var bgColor = init.popupinfo[i].bgColor;

                elContainer += '<div style="background-color:'+bgColor+'" id="popup_banner'+i+'">';
                elContainer += '<a href="'+link+'" target="'+target+'">';
                elContainer += '<img src="'+imgurl+'" alt="'+alt+'"/>';
                elContainer += '</a>';
                elContainer += '</div>';
            })

            if(init.popupinfo.length > 1){
                elContainer += '<span style="position:absolute; top:10px; right:20px; zindex:1" class="item_clt">';
                $.each(init.popupinfo,function(i,e){
                    elContainer += '<a href="#popup_banner'+i+'" style="font-size:0; display:inline-block; width:15px; height:15px; background-color:#AAA; margin:0 2.5px">'+i+'</a>';
                })
                elContainer += '</span>';
            }
            elContainer += '<span class="pop-close-btn" style="position:absolute; right:20px; bottom:10px; font-size:12px">';
            elContainer += '<input type="checkbox" id="todayCheckbox"/><label for="todayCheckbox"> '+init.btnTitle+'</label>'
            elContainer += '</span>'

            return $(elContainer);
        }


        var eventSetting = {
            openPopup:function(){
                var binCookie = eventSetting.getcooki(elClassName);

                //cookie true
                if(binCookie == 'done'){
                    $(init.extendingElement).css('top',init.Height);
                    $this.remove();
                    return;
                }

                //open setting
                $this.append(elementSet()).css({
                    'overflow':'hidden',
                    'position':'relative'
                }).children('div').css({
                    'width':'100%',
                }).children('a').children('img').on('load',function(){
                    $(this).parent('a').css({
                        'display':'inline-block',
                        'position':'relative',
                        'left':'50%',
                        'marginLeft':function(){
                            return - $(this).width()/2;
                        }
                    })
                })


                //start slide event
                if(slide_boolen){

                    movmuent(init.idx,false);
                    // event starter

                    $this.on('click','.item_clt a',function(){
                        init.idx = $(this).index();
                        movmuent(init.idx,true)
                    });

                    if(init.interval){

                        itervals = setInterval(function(){

                            init.idx ++;
                            if(init.idx == $('.item_clt a').length){
                                init.idx = 0
                            }
                            movmuent(init.idx,true);

                        },init.speed);

                        $this.on({
                            'mouseenter':function(){
                                clearInterval(itervals)
                            },
                            'mouseleave':function(){

                                itervals = setInterval(function(){

                                    init.idx ++;
                                    if(init.idx == $('.item_clt a').length){
                                        init.idx = 0
                                    }
                                    movmuent(init.idx,true);

                                },init.speed);
                            }
                        })
                    }

                }else{
                    $(init.extendingElement).css('top',init.popHeight);
                }

            },
            todayclose :function(){
                $(init.extendingElement).css('top',init.Height);
                eventSetting.setcooki(elClassName,'done',1);

                //del
                $this.find('.item_clt a').off('click');
                $this.off('mouseenter');
                $this.off('mouseleave');
                $this.children('.pop-close-btn').off('click');
                clearInterval(itervals);
                $this.remove();



            },
            setcooki:function(name, value, expiredays){
                var todayDate = new Date();
                todayDate.setDate( todayDate.getDate() + expiredays );
                document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
            },
            getcooki:function(name){
                var nameOfCookie = name + "=";
                var x = 0;
                while ( x <= document.cookie.length )
                {
                    var y = (x+nameOfCookie.length);
                    if ( document.cookie.substring( x, y ) == nameOfCookie ) {
                        if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                        endOfCookie = document.cookie.length;
                        return unescape( document.cookie.substring( y, endOfCookie ) );
                    }
                    x = document.cookie.indexOf( " ", x ) + 1;
                    if ( x == 0 )
                    break;
                }
                return "";
            }
        }

        //lotion
        function movmuent (idx,first){
            $this.children('div').eq(idx).addClass('on').show(0,function(){
                if(first){
                    $(this).find('a').css({

                        'marginLeft':function(){
                            return -$(this).width()/2;
                        }
                    })
                }
            }).siblings('div').hide().removeClass('on');
            $this.children('.item_clt').children('a').eq(idx).addClass('on').css('backgroundColor','red').siblings('a').css('backgroundColor','#aaa').removeClass('on');
        }

        eventSetting.openPopup();
        $this.children('.pop-close-btn').on('click',eventSetting.todayclose);

    }
})(jQuery);
