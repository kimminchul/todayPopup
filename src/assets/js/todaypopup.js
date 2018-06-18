

// 팝업
(function($){

    $.fn.popupEvent = function(option){

        var init = $.extend({
            extendingElement:'header',
            Height:'0px',
            popHeight:'100px',
            popupinfo:[
                //팝업정보
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


        var elementSet = function(link,imgurl,alt,target){

            var elContainer = '';
            elContainer += '<div style="background-color:'+init.popupinfo[0].bgColor+'">';
            elContainer += '<a href="'+link+'" target="'+target+'">';
            elContainer += '<img src="'+imgurl+'" alt="'+alt+'"/>';
            elContainer += '</a>';
            elContainer += '</div>';
            elContainer += '<span class="pop-close-btn" style="position:absolute; right:20px; bottom:20px; font-size:12px">';
            elContainer += '<input type="checkbox" id="todayCheckbox"/><label for="todayCheckbox"> '+init.btnTitle+'</label>'
            elContainer += '</span>'

            return elContainer;
        }

        var eventSetting = {
            openPopup:function(){
                var binCookie = eventSetting.getcooki(elClassName);

                //cookie true
                if(binCookie == 'done'){
                    $(init.extendingElement).css('top',init.Height);
                    $this.hide();
                    return
                }

                //open setting

                $this.append(elementSet(init.popupinfo[0].link,init.popupinfo[0].imgUrl,init.popupinfo[0].alt,init.popupinfo[0].target))

                .css({
                    'overflow':'hiddne',
                    'position':'relative'
                })
                .children('div')
                .css({
                    'width':'100%',
                })
                .children('a').children('img').on('load',function(){
                    $(this).parent('a').css({
                        'display':'inline-block',
                        'position':'relative',
                        'left':'50%',
                        'marginLeft':function(){
                            return - $(this).width()/2
                        }
                    })
                })

                $(init.extendingElement).css('top',init.popHeight);

            },
            todayclose :function(){
                $(init.extendingElement).css('top',init.Height);
                $this.hide();
                eventSetting.setcooki(elClassName,'done',1);
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
        eventSetting.openPopup();
        $this.children('.pop-close-btn').on('click',eventSetting.todayclose);

    }
})(jQuery);
