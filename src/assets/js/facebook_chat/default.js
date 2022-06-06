! function(require, define) {
    var DOMAIN, CUSTOMER, ZOTABOX, DOMAIN_STATIC_DIR, DOMAIN_CACHE_DIR, Stats, _, async, Class, Widget, DomainRules, Sly, CookieManager, Request, jQuery;
    define("Widgets.FacebookChat.BaseWidgetFunction", ["Core.Animation", "Core.Request", "Depd.ZBLib"], function(t, e, r) {
        return isClickTab = !1, {
            button: document.createElement("div"),
            ZBLib: null,
            cookieManager: null,
            options: {},
            isDefineFB: !1,
            isLoadedChatbox: !1,
            defaultScrollTop: 0,
            isShowWidget: !0,
            updatedScroll: !1,
            updateScrolled: !1,
            isDialogShow: !1,
            logoElm: null,
            isDefaultTab: !1,
            boxChatCss: null,
            onIframeReady: function() {},
            render: function() {
                var o = this;
                if (this.ZBLib = new r, _.extend(this.data, {
                        domain: DOMAIN
                    }), this.data.pageHtml = this.templates.page(_.extend(this.data, {})), this.data.isRenderPageHtml = !0, this.isDefaultTab = 4 == this.data.tab_type && "icon-facebook-messenger-icon-01" == this.data.tab_text_icon, _.isEmpty(this.data.facebook_fanpage_url) && _.isEmpty(this.data.fanpage_id)) return this.data.isShowWidget = this.isShowWidget, !1;
                (window.innerWidth <= 720 && 1 == parseInt(this.data.open_msg_mobile) || window.innerWidth <= 320) && (this.isShowWidget = !1), this.data.isShowWidget = this.isShowWidget, this.defaultScrollTop = Zotabox.Core.jQuery(window).scrollTop(), Zotabox.addEvent("scroll", window, function(t) {
                    var e = o.defaultScrollTop,
                        a = Zotabox.Core.jQuery(window).scrollTop();
                    a - e < Zotabox.Core.jQuery(document).height() / 10 && (o.defaultScrollTop = a)
                }), this.data.ZOTABOX_DOMAIN_ACTIONS = ZOTABOX.actions, this.createButton();
                var t = document.createElement("style");
                return t.setAttribute("type", "text/css"), t.styleSheet ? t.styleSheet.cssText = Zotabox.getTemplates("fonts")({
                    STATIC_DOMAIN_URI: [Zotabox.getDomainURIs("static"), "__" + Zotabox.getConfig().version].join("/")
                }) : t.textContent = Zotabox.getTemplates("fonts")({
                    STATIC_DOMAIN_URI: [Zotabox.getDomainURIs("static"), "__" + Zotabox.getConfig().version].join("/")
                }), document.getElementsByTagName("head")[0].appendChild(t), 0 == this.isShowWidget && this.addMobileButton(this.data.tab_color, this.data.tab_text_color, this.data.tab_text_icon), this
            },
            doShow: function() {
                var t, e, a = this;
                "undefined" == typeof FB || 0 == Zotabox.Core.jQuery(".fb-page,.fb-like,.fb-like-box,.fb-customerchat").length && 0 == Zotabox.Core.jQuery(".fb-messenger-checkbox").length ? a.createContent() : (t = 0, e = setInterval(function() {
                    (0 != Zotabox.Core.jQuery('[fb-xfbml-state="rendered"]').length || 30 <= t || 0 != Zotabox.Core.jQuery(".fb-customerchat").length && void 0 === window.fbAsyncInit) && (clearInterval(e), 0 != Zotabox.Core.jQuery(".fb-messenger-checkbox").length && Zotabox.Core.jQuery(".fb-messenger-checkbox").removeAttr("fb-xfbml-state"), a.createContent()), t++
                }, 500)), 1 == (Zotabox.Cookies.Session.cookie("_ZB_STATIC_" + this.data.widget_id + "_CLOSE_FBC_TAB") || parseInt(this.data.auto_open)) && 720 <= window.innerWidth && this.data.chatbox_type, 3 != this.data.chatbox_type && this.addMobileButton(this.data.tab_color, this.data.tab_text_color, this.data.tab_text_icon)
            },
            addMobileButton: function(t, e, a) {
                var o = this.data.placement;
                (_.isEqual(this.data.placement, "bottom/left") || _.isEqual(this.data.placement, "bottom/right")) && (o = this.data.offsetRight > this.data.offsetLeft ? "left" : "right"), Zotabox.getMobileButton().addButton({
                    name: "facebook_messenger_" + this.data.widget_id,
                    widget_id: this.data.widget_id,
                    monitor_id: this.data.monitor_id,
                    label: "Facebook Messenger",
                    icon: "zb-icon " + (_.isEqual(a, "icon-tab-icon-none") || _.isEmpty(a) ? "icon-facebook-messenger-icon-01" : this.data.tab_text_icon),
                    color: t,
                    target: "_parent",
                    deeplink: "javascript:Zotabox.getWidgetById(" + this.data.widget_id + ").showChatBox(true);",
                    position: 0,
                    on: !!Zotabox.getDomainRules().isEnable(this._id),
                    iconColor: e,
                    align: o
                }), Zotabox.getMobileButton().setOptions({
                    align: o
                })
            },
            createContent: function() {
                var t, e, a, o = this,
                    i = this.el,
                    n = document.querySelector('[data-zbwid="' + this.data.client_hash_id + '"]');
                Zotabox.isPJAX() && this.reloadSdkFB(), 1 == this.isShowWidget ? ("undefined" != typeof FB || 0 != Zotabox.Core.jQuery("#facebook-jssdk").length ? "undefined" != typeof FB && null != FB.CustomerChat ? (Zotabox.Core.jQuery(".fb-customerchat").addClass("ztb-customchatbox-" + o.data.client_hash_id), _.isEmpty(Zotabox.Core.jQuery(".fb-customerchat").attr("page_id")) ? (s = Zotabox.Core.jQuery(".fb-customerchat").parent(), Zotabox.Core.jQuery(".fb-customerchat").remove(), s.append(o.templates.page(_.extend(o.data, {}))), this.reloadSdkFB()) : 0 == Zotabox.Core.jQuery(".fb-customerchat").length ? FB.XFBML.parse() : void 0 === window.fbAsyncInit && this.reloadSdkFB()) : ("undefined" != typeof FB && null == FB.CustomerChat || 0 != Zotabox.Core.jQuery("#facebook-jssdk").length) && (0 != Zotabox.Core.jQuery(".fb-customerchat").length && Zotabox.Core.jQuery(".fb-customerchat").attr("page_id") == this.data.fanpage_id && (Zotabox.Core.jQuery(".fb-customerchat").addClass("ztb-customchatbox-" + o.data.client_hash_id), this.data.isRenderPageHtml = !1), this.isDefineFB = !0, this.reloadSdkFB()) : "undefined" != typeof FB && void 0 !== FB.CustomerChat || 0 != Zotabox.Core.jQuery(".fb-customerchat").length && Zotabox.Core.jQuery(".fb-customerchat").attr("page_id") == this.data.fanpage_id && (Zotabox.Core.jQuery(".fb-customerchat").addClass("ztb-customchatbox-" + o.data.client_hash_id), this.data.isRenderPageHtml = !1), e = "script", a = "facebook-jssdk", s = (t = document).getElementsByTagName(e)[0], t.getElementById(a) || ((e = t.createElement(e)).id = a, e.src = "//connect.facebook.net/" + o.data.language + "/sdk/xfbml.customerchat.js", s.parentNode.insertBefore(e, s))) : o.updateWidthButton(!0);
                var s = document.createElement("div");
                s.setAttribute("id", "ztb-widget-container"), s.innerHTML = this.templates.iframe(_.extend(this.data, {})), i.appendChild(s), void 0 !== window.fbAsyncInit && (delete window.fbAsyncInit, this.reloadSdkFB()), window.fbAsyncInit = function() {
                    var e;
                    Zotabox.Core.jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox').attr("fb-xfbml-state", !1), 1 == o.isShowWidget && (o._isMobileIos(), FB.init({
                        cookie: !0,
                        status: !0,
                        autoLogAppEvents: !0,
                        xfbml: !0,
                        version: "v12.0",
                        appId: null != window.appId ? "" + window.appId : null
                    })), 1 == o.data.chatbox_type || 0 == o.data.fanpage_id || "" == o.data.fanpage_id ? (FB.XFBML.parse(n, function() {
                        Zotabox.Core.jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #loading-wrapper').addClass("hidden-loading"), jQuery(".ztb-fb-root").html(jQuery(".fb_reset").html()), setTimeout(function() {
                            jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #chatbox-content').height() < 330 && FB.XFBML.parse(n)
                        }, 1e4)
                    }), "rendered" != jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox').attr("fb-xfbml-state") && "parsed" != jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox').attr("fb-xfbml-state") && "none" == document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] #loading-wrapper').style.display || Zotabox.Core.jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #loading-wrapper').addClass("hidden-loading"), FB.Event.subscribe("xfbml.render", function() {
                        0 == Zotabox.Core.jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #loading-wrapper').hasClass("hidden-loading") && (n = document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox'), document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox').removeAttribute("fb-xfbml-state"), document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox').removeAttribute("fb-iframe-plugin-query"), document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox').innerHTML = "", FB.XFBML.parse(), FB.XFBML.parse(document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] #zb-fb-chatbox'), function() {
                            Zotabox.Core.jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #loading-wrapper').addClass("hidden-loading"), jQuery(".ztb-fb-root").html(jQuery(".fb_reset").html())
                        }))
                    })) : (e = Zotabox.Core.jQuery('[data-zbwid="' + o.data.client_hash_id + '"] .zb-fbc-trigger'), FB.Event.subscribe("customerchat.show", function() {
                        o.removeProgress(), o.isDialogShow = !0, o.setLogoPosition()
                    }), FB.Event.subscribe("customerchat.dialogShow", function() {
                        console.log("customerchat.dialogShow");
                        var t = Zotabox.Core.jQuery(".ztb-customchatbox-" + o.data.client_hash_id + " iframe");
                        e.addClass("zb-fbc-chatbox-collapse"), e.css("pointer-events", "all"), o.isDialogShow = !0, o.setLogoPosition(), null == o.boxChatCss && 0 < t.length && (o.boxChatCss = {
                            "max-height": t.css("max-height"),
                            "min-height": t.css("min-height"),
                            height: t.css("height")
                        }), t.removeClass("zb-chatbox-hidden"), t.addClass("zb-chatbox-show")
                    }), FB.Event.subscribe("customerchat.hide", function() {
                        o.isDialogShow = !1, null != o.logoElm && o.logoElm.hide()
                    }), FB.Event.subscribe("customerchat.dialogHide", function() {
                        console.log("customerchat.dialogHide");
                        var t = Zotabox.Core.jQuery(".ztb-customchatbox-" + o.data.client_hash_id + " iframe");
                        e.css("pointer-events", "all"), e.removeClass("zb-fbc-chatbox-collapse"), t.addClass("zb-chatbox-hidden"), t.removeClass("zb-chatbox-show"), o.isDialogShow = !1, null != o.logoElm && o.logoElm.hide()
                    }), o.updateWidthButton(!0))
                }, document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] #close-chatbox-btn');
                var d = document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] .ztb-fbc-widgetfirame');
                Zotabox.Core.jQuery(document).on("click", '[data-zbwid="' + o.data.client_hash_id + '"] #close-chatbox-btn *', function() {
                    var t = document.createElement("meta");
                    t.name = "viewport", t.content = "width=device-width, initial-scale=1.0", document.getElementsByTagName("head")[0].appendChild(t), o._isMobileIos() && window.scrollTo(0, 0), void 0 !== d && ((o._isMobileIos() || o.isFacebookApp()) && document.querySelector('[data-zbwid="' + o.data.client_hash_id + '"] .ztb-fbc-widgetfirame').setAttribute("style", "bottom: -100%; height: 100% !important;max-width:508px"), jQuery('[data-zbwid="' + o.data.client_hash_id + '"] .ztb-fbc-widgetfirame').animate({
                        bottom: "-100%"
                    }, 1e3), jQuery('[data-zbwid="' + o.data.client_hash_id + '"] #ztb-fbc-tabwrapper').animate({
                        opacity: 1
                    }, 1e3), chatboxStatus = 0, Zotabox.Cookies.Session.cookie("_ZB_STATIC_" + o.data.widget_id + "_CLOSE_FBC_TAB", 0))
                }), i = Sly(".ztb-about").find(this.el), s = Sly(".zb-all-close-button").find(this.el), this.ZBLib = new r, i && (50 <= this.ZBLib.getBrightness(this.data.tab_color) ? (i.style.color = "#212121", s.style.color = "#212121") : (i.style.color = "white", s.style.color = "white"))
            },
            reloadSdkFB: function() {
                delete window.FB, Zotabox.Core.jQuery("#fb-root").html(""), Zotabox.Core.jQuery("#fb-root").attr("class", ""), Zotabox.Core.jQuery("#facebook-jssdk").remove(), Zotabox.Core.jQuery("#fb-root").trigger("facebook:init")
            },
            createButton: function() {
                var o = this;
                if (0 < Zotabox.Core.jQuery('[data-zbwid="' + this.data.client_hash_id + '"] .zb-fbc-trigger').length) return !1;
                this.button = document.createElement("div"), Zotabox.addClass(this.button, "zb-fbc-trigger");
                var t = "ztb-" + this.data.placement;
                "bottom/left" != this.data.placement && "bottom/right" != this.data.placement || (t = this.data.offsetRight > this.data.offsetLeft ? "ztb-left" : "ztb-right"), Zotabox.addClass(this.button, t), this.button.innerHTML = this.templates.trigger(_.extend(this.data, {})), this.el.appendChild(this.button), Zotabox.Core.jQuery('[data-zbwid="' + this.data.client_hash_id + '"] #ztb-fbc-show-widget').click(function() {
                    o.showChatBox(!0), Stats.sendEvents2("TC", o.data.monitor_id, o.data.widget_id)
                }), 2 == this.data.tab_type ? (Zotabox.addEvent("click", Sly(".ztb-close-tabimage").find(o.el), function() {
                    3 != o.data.chatbox_type && (Sly("#ztb-fbc-tabwrapper").find(o.el).style.display = "none"), 3 == o.data.chatbox_type && o.hideCustomChatbox(), Zotabox.Core.jQuery("#ztb-fbc-tabwrapper").animate({
                        opacity: "0"
                    }), Zotabox.Cookies.Session.cookie("_ZB_STATIC_" + o.data.widget_id + "_CLOSE_FBC_TAB", 0), Stats.sendEvents2("TC", o.data.monitor_id, o.data.widget_id)
                }), Zotabox.addEvent("resize", window, function(t) {
                    var e = window.innerWidth,
                        a = parseInt(o.data.tab_size),
                        e = parseInt(e / 100) * parseInt(a);
                    (a = 1.5 * parseInt(o.data.tab_image_default_size)) < (e = e < 40 ? 40 : e) && (e = a), Sly("#ztb-fbc-show-widget").find(o.el).style.width = e + "px"
                })) : (Sly("#ztb-fbc-show-widget").find(this.el).onmouseover = function() {
                    Sly("#ztb-fbc-show-widget").find(this.el).style.backgroundColor = o.ZBLib.getHoverColor(o.data.tab_color)
                }, Sly("#ztb-fbc-show-widget").find(this.el).onmouseout = function(t) {
                    Sly("#ztb-fbc-show-widget").find(this.el).style.backgroundColor = o.data.tab_color
                })
            },
            removeProgress: function() {
                Zotabox.Core.jQuery('[data-zbwid="' + this.data.client_hash_id + '"] #ztb-fbc-show-widget,#ztb_facebook_messenger_' + this.data.widget_id + ',[data-zbwid="' + this.data.client_hash_id + '"] .ztb-fbc-tabicon').removeClass("progress-bar-strip")
            },
            _isMobileSafari: function() {
                return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit.+Version/)
            },
            _isMobileIos: function() {
                return navigator.userAgent.match(/(iPod|iPhone|iPad)/)
            },
            _initializeComponent: function() {},
            isFacebookApp: function() {
                var t = navigator.userAgent || navigator.vendor || window.opera;
                return -1 < t.indexOf("FBAN") || -1 < t.indexOf("FBAV")
            },
            isIOSMobile: function() {
                var t = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"];
                if (navigator.platform)
                    for (; t.length;)
                        if (navigator.platform === t.pop()) return !0;
                return !1
            },
            enable: function() {
                this.setEnable(!0), this.render(), this.doShow(), Zotabox.Core.jQuery('[data-wzb="SocialMobileTool"] .zbx-trigger [widget-id="' + this.data.widget_id + '"]').show()
            },
            disable: function() {
                Zotabox.Core.jQuery('[data-wzb="SocialMobileTool"] .zbx-trigger [widget-id="' + this.data.widget_id + '"]').hide()
            },
            showChatBox: function(t) {
                var a, o, i, n, e, s, d = this,
                    r = 0 == (r = Zotabox.Core.jQuery(".ztb-customchatbox-" + this.data.client_hash_id + " iframe")).length ? Zotabox.Core.jQuery("#fb-root .fb_iframe_widget[fb-iframe-plugin-query] iframe") : r,
                    b = 0 == this.isLoadedChatbox && 0 == r.length;
                this.data.use_default_icon, 0 == this.data.fanpage_id || "" == this.data.fanpage_id || 2 != this.data.chatbox_type && 1 != b && 0 != this.isLoadedChatbox ? 0 != this.data.fanpage_id && "" != this.data.fanpage_id && 3 == this.data.chatbox_type ? "undefined" != typeof FB && (e = Zotabox.Core.jQuery('[data-zbwid="' + this.data.client_hash_id + '"] .zb-fbc-trigger'), a = Zotabox.Core.jQuery('[data-zbwid="' + this.data.client_hash_id + '"] #ztb-fbc-show-widget,#ztb_facebook_messenger_' + this.data.widget_id + ',[data-zbwid="' + this.data.client_hash_id + '"] .ztb-fbc-tabicon'), o = Zotabox.Core.jQuery(".ztb-customchatbox-" + d.data.client_hash_id + " iframe"), 0 == this.isDialogShow && "0px" == r.css("max-height") ? (FB.CustomerChat.showDialog(), e.addClass("zb-fbc-chatbox-collapse"), this.isDialogShow = !0, r.removeClass("zb-chatbox-hidden"), null != this.boxChatCss && (r.css(this.boxChatCss), e.addClass("zb-fbc-chatbox-collapse")), d.ZBLib.isMobileAndTablet() && (i = 0, n = setInterval(function() {
                    o = Zotabox.Core.jQuery(".ztb-customchatbox-" + d.data.client_hash_id + " iframe"), 10 <= i && (a.removeClass("progress-bar-strip"), clearInterval(n));
                    var t = Zotabox.Core.jQuery("#ztb_facebook_messenger_" + d.data.widget_id),
                        e = Zotabox.Core.jQuery(window).scrollTop();
                    (0 == parseInt(o.css("max-height")) || parseInt(o.css("bottom")) <= 0) && (0 < t.length && o.css({
                        "max-height": "100%",
                        bottom: window.innerHeight - (t.offset().top - e) + "px"
                    }), a.removeClass("progress-bar-strip"), clearInterval(n), d.isDialogShow = !0), i++
                }, 1e3), FB.Event.subscribe("customerchat.dialogShow", function() {
                    clearInterval(n)
                }))) : (a.removeClass("progress-bar-strip"), this.hideBoxChatIframe(), e.removeClass("zb-fbc-chatbox-collapse"), o.removeClass("zb-chatbox-show"), FB.CustomerChat.hideDialog(), this.isDialogShow = !1)) : ((this._isMobileIos() || this.isFacebookApp()) && (document.querySelector('[data-zbwid="' + d.data.client_hash_id + '"] .ztb-fbc-widgetfirame').setAttribute("style", "bottom: auto; height: 100% !important;max-width:508px"), (e = document.createElement("meta")).name = "viewport", e.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0", document.getElementsByTagName("head")[0].appendChild(e), window.scrollTo(0, 0)), jQuery('[data-zbwid="' + d.data.client_hash_id + '"] .ztb-fbc-widgetfirame').show(), jQuery('[data-zbwid="' + d.data.client_hash_id + '"] .ztb-fbc-widgetfirame').animate({
                    bottom: 0
                }, 600), jQuery('[data-zbwid="' + d.data.client_hash_id + '"] #ztb-fbc-tabwrapper').animate({
                    opacity: 0
                }, 300, function() {}), Zotabox.Cookies.Session.cookie("_ZB_STATIC_" + this.data.widget_id + "_CLOSE_FBC_TAB", 1), window.innerWidth <= 1024 && (document.getElementById("close-chatbox-btn").style.display = "block")) : (s = 0 != this.data.fanpage_id && "" != this.data.fanpage_id ? "https://m.me/" + this.data.fanpage_id : (s = this.data.facebook_fanpage_url || DOMAIN.facebook_fanpage, (s = this.ZBLib.convertUrl(s)).toLowerCase().replace("facebook.com", "m.me")), 1 == this.isIOSMobile() ? window.location.href = s : window.open(s))
            },
            convertUrl: function(t) {
                return t && 0 != t.length ? 0 == /^http[s]?:\/\//.test(t) ? "http://" + t : t : "#"
            },
            hideBoxChatIframe: function() {
                Zotabox.Core.jQuery(".ztb-customchatbox-" + this.data.client_hash_id + " iframe").css({
                    "max-height": "0px",
                    "min-height": "",
                    height: ""
                })
            },
            updateWidthButton: function(a, t) {
                if (0 == this.isShowWidget) return !1;
                var b = this,
                    o = 0,
                    i = !1,
                    l = Zotabox.Core.jQuery(".ztb-customchatbox-" + b.data.client_hash_id + " iframe"),
                    c = Zotabox.Core.jQuery(".fb_dialog_advanced iframe,.fb_dialog_mobile iframe,.fb_dialog_advanced iframe"),
                    h = Zotabox.getMobileButton()._getCountButton();

                function n() {
                    l = Zotabox.Core.jQuery(".ztb-customchatbox-" + b.data.client_hash_id + " iframe");
                    var t, e, o = Zotabox.Core.jQuery('[data-zbwid="' + b.data.client_hash_id + '"] .zb-fbc-trigger'),
                        i = parseInt(l.css("max-height")),
                        n = Zotabox.Core.jQuery('[data-zbwid="' + b.data.client_hash_id + '"] #ztb-fbc-tabwrapper'),
                        s = Zotabox.Core.jQuery('[data-attr="facebook_messenger_' + b.data.widget_id + '"]'),
                        d = Zotabox.Core.jQuery(window).scrollTop(),
                        r = setInterval(function() {
                            c = Zotabox.Core.jQuery(".fb_dialog_advanced,.fb_dialog_mobile,.fb_dialog_advanced iframe");
                            var t = !1;
                            if (Zotabox.getMobileButton().is_single_button, (2 == h && window.innerWidth <= 720 || 0 == Zotabox.getMobileButton().is_single_button && window.innerWidth <= 720 && !_.isEmpty(Zotabox.getMobileButton()._getButtonsHtml())) && (t = !0), 0 != c.length || 1 == t)
                                if (0 != c.length && (b.isLoadedChatbox = !0), Zotabox.Core.jQuery('[data-zbwid="' + b.data.client_hash_id + '"] #ztb-fbc-tabwrapper').show(), clearInterval(r), 0 != s.length && window.innerWidth <= 720) 0 != c.length && (window.innerHeight, s.offset().top), l.css({
                                    "max-height": 0 != i ? s.offset().top - d - 10 + "px" : 0,
                                    bottom: window.innerHeight - (s.offset().top - d - 10) + "px"
                                });
                                else if (0 == Zotabox.getMobileButton().is_single_button && window.innerWidth <= 720 && !_.isEmpty(Zotabox.getMobileButton()._getButtonsHtml())) 0 != Zotabox.Core.jQuery(".zbx-trigger .ztb-single-btt").length ? (c.length, n[0].style.setProperty("bottom", "65px", "important"), n[0].style.setProperty("right", "20px", "important"), n[0].style.setProperty("left", "auto", "important"), l.css({
                                "max-height": 0 != i ? window.innerHeight - 125 + "px" : 0,
                                bottom: window.innerHeight - (window.innerHeight - 125) + "px"
                            }), Zotabox.Core.jQuery(".zbx-trigger")[0].style.setProperty("bottom", "120px", "important")) : (c.length, n[0].style.setProperty("bottom", "70px", "important"), n[0].style.setProperty("right", "10px", "important"), n[0].style.setProperty("left", "auto", "important"), 0 == b.isDefaultTab && l.css({
                                "max-height": 0 != i ? window.innerHeight - 135 + "px" : 0,
                                bottom: window.innerHeight - (window.innerHeight - 135) + "px"
                            })), o.addClass("ztb-not-hide");
                            else if (Zotabox.getMobileButton().is_single_button, 2 == h && window.innerWidth <= 720) "left" == (b.data.offsetLeft > b.data.offsetRight ? "right" : "left") ? 0 != Zotabox.Core.jQuery(".ztb-smt-left a").length ? (c.length, n[0].style.setProperty("bottom", "20px", "important"), n[0].style.setProperty("left", "20px", "important"), n[0].style.setProperty("right", "auto", "important"), e = "75px", Zotabox.Core.jQuery(".ztb-smt-left").attr("style", "bottom: " + e + " !important")) : c.length : 0 != Zotabox.Core.jQuery(".ztb-smt-right a").length ? (c.length, n[0].style.setProperty("bottom", "20px", "important"), n[0].style.setProperty("right", "20px", "important"), n[0].style.setProperty("left", "auto", "important"), e = "75px", Zotabox.Core.jQuery(".ztb-smt-right").attr("style", "bottom: " + e + " !important")) : c.length, o.addClass("ztb-not-hide"), 0 != c.length && l.css({
                                "max-height": 0 != i ? n.offset().top - d - 5 + "px" : 0,
                                bottom: window.innerHeight - (n.offset().top - d - 5) + "px"
                            });
                            else {
                                var e = ((e = Zotabox.Core.jQuery('[data-zbwid="' + b.data.client_hash_id + '"] #ztb-fbc-tabwrapper')).outerWidth(), e.outerHeight());
                                if (c.length, l.css("max-height", 0 != i ? "auto" : 0), 2 != b.data.tab_type) {
                                    var a = e;
                                    switch (parseInt(b.data.tab_type)) {
                                        case 3:
                                        case 4:
                                            a += 20
                                    }
                                    0 == b.isDefaultTab && Zotabox.Core.jQuery(".ztb-customchatbox-" + b.data.client_hash_id + " iframe").css("bottom", a + "px")
                                }
                            }
                        }, 100);
                    0 == l.width() && (t = 0, e = setInterval(function() {
                        5 <= t && (clearInterval(e), FB.XFBML.parse()), t++
                    }, 1e3)), 1 == a && 0 == b.updateScrolled && (b.updateScrolled = !0, Zotabox.Core.jQuery(window).scrollTop(b.defaultScrollTop)), 0 == b.ZBLib.isMobileAndTablet() && "0px" != l.css("max-height") && "none" != l.css("max-height") && (b.isDialogShow = !0, o.addClass("zb-fbc-chatbox-collapse"))
                }(1 == (Zotabox.getMobileButton().is_single_button && 2 != h) || 0 == h) && window.innerWidth <= 720 && (this.addMobileButton(this.data.tab_color, this.data.tab_text_color, this.data.tab_text_icon), Zotabox.getMobileButton().render(), Zotabox.getMobileButton().enable()), 1 == h && window.innerWidth, 1 == t && n();
                var s = setInterval(function() {
                    var t, e, a;
                    0 != (l = Zotabox.Core.jQuery(".ztb-customchatbox-" + b.data.client_hash_id + " iframe")).length || 0 != Zotabox.Core.jQuery(".fb_dialog_advanced,.fb_dialog_mobile").length ? (i = !0, e = Zotabox.Core.jQuery(".fb_dialog_advanced iframe,.fb_dialog_mobile iframe"), 0 != l.length ? 100 < l.outerHeight() && 0 != e.length ? (clearInterval(s), n()) : l[0].addEventListener("load", function() {
                        clearInterval(s), n()
                    }) : (clearInterval(s), Zotabox.Core.jQuery(".fb_dialog_advanced iframe,.fb_dialog_mobile iframe")[0].addEventListener("load", function() {
                        n()
                    })), 20 == o && 1 == b.isDefineFB && void 0 === FB.CustomerChat && (delete window.FB, Zotabox.Core.jQuery("#fb-root").html(""), Zotabox.Core.jQuery("#fb-root").attr("class", ""), Zotabox.Core.jQuery("#facebook-jssdk").remove(), Zotabox.Core.jQuery("#fb-root").trigger("facebook:init"), e = "facebook-jssdk", a = (t = document).getElementsByTagName("script")[0], t.getElementById(e) || ((t = t.createElement("script")).id = e, t.src = "https://connect.facebook.net/" + b.data.language + "/sdk.js", a.parentNode.insertBefore(t, a)), window.fbAsyncInit = function() {
                        FB.init({
                            appId: null != window.appId ? "" + window.appId : null,
                            autoLogAppEvents: !0,
                            xfbml: !0,
                            version: "v2.11"
                        })
                    })) : 0 == i && 1 == b.isDefineFB && void 0 === FB.CustomerChat && (a = document.querySelector('[data-zbwid="' + b.data.client_hash_id + '"]'), FB.XFBML.parse(a, function() {
                        clearInterval(s), n()
                    })), 60 <= o && clearInterval(s), o++
                }, 500)
            },
            hideCustomChatbox: function() {
                Zotabox.Core.jQuery(".ztb-customchatbox-" + this.data.client_hash_id + ",.fb_dialog_advanced,.fb_dialog_mobile").hide()
            },
            setLogoPosition: function() {
                if (window.innerWidth < 700) return !1;
                var n, s, d, t = Zotabox.Core.jQuery(".ztb-customchatbox-logo"),
                    r = t.clone(),
                    b = !1,
                    l = !1,
                    c = 1 == this.data.use_default_icon;
                this.logoElm = r, 0 != t.length && (n = this, s = Zotabox.Core.jQuery(".ztb-customchatbox-" + n.data.client_hash_id), d = Zotabox.Core.jQuery(".ztb-customchatbox-" + n.data.client_hash_id + " iframe"), s.mouseenter(function(t) {
                    var e, a, o, i;
                    e = Zotabox.Core.jQuery(window).scrollTop(), a = d.outerHeight(), o = d.outerWidth(), a = isNaN(a) ? d.outerHeight() : a, i = n.data.offsetLeft > n.data.offsetRight ? "right" : "left", l = !0, 0 == b && 0 == s.find(".ztb-customchatbox-logo").length && (s.append(r), b = !0), r[0].style.setProperty("position", "fixed", "important"), a = d.offset().top - e + a + 10 - 10, r[0].style.setProperty("top", a + "px", "important"), "left" == i && 0 == c ? r[0].style.setProperty("left", d.offset().left + o - 164 + "px", "important") : r[0].style.setProperty("left", d.offset().left + 12 + "px", "important"), r.fadeIn(100, function() {
                        var t;
                        window.innerWidth <= 720 && (t = setInterval(function() {
                            "none" == document.defaultView.getComputedStyle(d[0]).display && (clearInterval(t), r.fadeOut(100))
                        }, 100))
                    })
                }), s.mouseleave(function(t) {
                    l = !1, setTimeout(function() {
                        0 == l && r.fadeOut(200)
                    }, 0)
                }), Zotabox.Core.jQuery(document).on("mouseleave", ".fb_dialog_mobile iframe,.fb_dialog_advanced iframe", function(t) {
                    l = !1, r.fadeOut(200)
                }))
            },
            updateFBbuttonPosition: function() {
                var t, e, a, o = Zotabox.Core.jQuery(window).scrollTop();
                1 == this.isLoadedChatbox && (a = Zotabox.Core.jQuery('[data-zbwid="' + this.data.client_hash_id + '"] #ztb-fbc-tabwrapper'), t = Zotabox.Core.jQuery('[data-attr="facebook_messenger"]'), e = Zotabox.Core.jQuery(".fb_dialog_advanced,.fb_dialog_mobile,.fb_dialog_advanced iframe"), (a = 0 != t.length ? t.offset().top - o : a.offset().top - o) != e.offset().top - o && 0 != a && 0 == this.updatedScroll ? this.updateWidthButton(!1, !0) : a == e.offset().top - o && (this.updatedScroll = !0))
            }
        }
    }), define("Widgets.FacebookChat.Default", ["Widgets.FacebookChat.BaseWidgetFunction"], function(t) {
        return t = _.extend(t, {
            options: {
                effect: "slideInDown",
                prefix: "zb-",
                padding: 0,
                logoLink: "https://info.zotabox.com/?utm_source=" + window.location.host.replace("www.", "") + "&utm_medium=Facebook%20Live%20Chat&utm_campaign=widget%20referral"
            },
            initialize: function() {
                this._initializeComponent()
            }
        }), Zotabox.Widget.extend(t)
    }), define("Widgets.FacebookChat.Default.Template", [], {
        iframe: function(obj) {
            obj = obj || {};
            var __t, __p = "",
                __j = Array.prototype.join;

            function print() {
                __p += __j.call(arguments, "")
            }
            with(obj) {
                __p += '<style type="text/css" media="print">\n    [data-wzb="FacebookChat"]{\n        display: none !important;\n    }\n</style>\n<div class="chatbox-wrapper ztb-fbc-widgetfirame">\n    <div id="loading-wrapper" >\n        <div id="circularG">\n            <div id="circularG_1" class="circularG"></div>\n            <div id="circularG_2" class="circularG"></div>\n            <div id="circularG_3" class="circularG"></div>\n            <div id="circularG_4" class="circularG"></div>\n            <div id="circularG_5" class="circularG"></div>\n            <div id="circularG_6" class="circularG"></div>\n            <div id="circularG_7" class="circularG"></div>\n            <div id="circularG_8" class="circularG"></div>\n        </div>\n    </div>\n    \n    <div id="close-chatbox-btn" class="ztb-close-chatbox">\n        <span class="zb-all-close-button"></span>\n    </div>\n    <div id="chatbox-content">\n        ';
                var FbFanpage = facebook_fanpage_url || DOMAIN.facebook_fanpage;
                "" != FbFanpage && !_.isEmpty(FbFanpage) || (FbFanpage = "https://www.facebook.com/Zotabox-1582377698657518/");
                var widthFB = 270,
                    heightFB = 330;

                function _isMobileSafari() {
                    return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit.+Version/)
                }

                function _isMobileIos() {
                    return navigator.userAgent.match(/(iPod|iPhone|iPad)/)
                }

                function _isFacebookApp() {
                    var t = navigator.userAgent || navigator.vendor || window.opera;
                    return -1 < t.indexOf("FBAN") || -1 < t.indexOf("FBAV")
                }(_isMobileIos() || _isFacebookApp()) && (heightFB = window.innerHeight - 22), __p += "\n        \n        ", "" == fanpage_id || 3 != parseInt(chatbox_type) ? __p += '\n        <div id="zb-fb-chatbox" class="fb-page" data-tabs="messages" data-href="' + (null == (__t = FbFanpage) ? "" : __t) + '" data-width="' + (null == (__t = widthFB) ? "" : __t) + '" data-height="' + (null == (__t = heightFB) ? "" : __t) + '" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"></div>\n        ' : 1 == isShowWidget && 1 == isRenderPageHtml && (__p += "\n        " + (null == (__t = pageHtml) ? "" : __t) + "\n        "), __p += ' \n    </div>\n    \n    <div id="login-message" class="login-message">\n        <span class="facebook-icon icon-iconmonstr-facebook-icon"></span>\n        <a href="http://facebook.com" target="_blank">\n            ' + (null == (__t = login_message) ? "" : __t) + "\n        </a>\n    </div>\n    ";
                var domain = window.location.host.replace("www.", ""),
                    USE_LOGO = 1;
                CUSTOMER.zotabox_logo == USE_LOGO && (__p += '\n    <div class="ztb-about">\n        <a title="zotabox" target="zotabox" href="https://info.zotabox.com/?utm_source=' + (null == (__t = domain) ? "" : __t) + '&utm_medium=Facebook%20Live%20Chat&utm_campaign=widget%20referral">\n            <div class="ztb-logo-popup">Powered by</div>\n        </a>\n    </div>\n\n    '), __p += "\n    \n</div>\n", 3 == chatbox_type && 4 == tab_type && CUSTOMER.zotabox_logo == USE_LOGO && (__p += '\n<div class="ztb-customchatbox-logo">\n    <a target="_blank" href="https://info.zotabox.com/?utm_source=' + (null == (__t = window.location.host.replace("www.", "")) ? "" : __t) + '&utm_medium=Facebook%20Chat&utm_campaign=widget%20referral">\n        <div class="ztb-fbc-logo">Powered by</div>\n    </a>\n</div>\n'), __p += '\n<div id="fb-root"></div>\n<style type="text/css">/*<![CDATA[*/' + (null == (__t = base_custom_css) ? "" : __t) + '/*]]>*/</style>\n<style type="text/css">/*<![CDATA[*/' + (null == (__t = custom_css) ? "" : __t) + "/*]]>*/</style>"
            }
            return __p
        },
        page: function(obj) {
            obj = obj || {};
            var __t, __p = "",
                __j = Array.prototype.join;

            function print() {
                __p += __j.call(arguments, "")
            }
            with(obj) {
                var enable = 1,
                    showDialog = parseInt(auto_open) == enable ? "show" : "hide";
                window.innerWidth <= 720 && parseInt(open_msg_mobile) == enable && (showDialog = "hide");
                var preview_page_real = 0 != fanpage_id;
                __p += '\n<div class="fb-customerchat ztb-customchatbox-' + (null == (__t = client_hash_id) ? "" : __t) + '"\n page_id="' + (null == (__t = 1 == Zotabox.isPreview() && 0 == preview_page_real ? 0x59f2a04a104ee : fanpage_id) ? "" : __t) + '"\n theme_color="' + (null == (__t = tab_color) ? "" : __t) + '"\n logged_in_greeting="' + (null == (__t = welcome_message) ? "" : __t) + '"\n logged_out_greeting="' + (null == (__t = welcome_message) ? "" : __t) + '"\n greeting_dialog_display="' + (null == (__t = showDialog) ? "" : __t) + '">\n</div>'
            }
            return __p
        },
        trigger: function(obj) {
            obj = obj || {};
            var __t, __p = "",
                __e = _.escape,
                __j = Array.prototype.join;

            function print() {
                __p += __j.call(arguments, "")
            }
            with(obj) {
                var tab_icon = tab_text_icon;
                switch ("icon-tab-icon-none" == tab_text_icon && (tab_icon = "icon-facebook-2-icon"), __p += '\n<div id="ztb-fbc-tabwrapper" class="ztb-tab-container">\n    ', ~~tab_type) {
                    default:
                        case 1:
                        __p += '\n        <div id="ztb-fbc-show-widget" class="ztb-fbc-tabbutton ' + (null == (__t = tab_style) ? "" : __t) + '">\n            <span class="' + (null == (__t = tab_text_icon) ? "" : __t) + ' zb-tab-text-icon"></span>\n            <span class="zb-all-icon-x zb-fbc-chatbox-collapse-icon zb-tab-text-icon"></span>\n            <div class="zb-tab-content">\n                ' + (null == (__t = tab_text) ? "" : __t) + '\n            </div>\n            <div class="ztb-fbc-tabicon">\n                <span class="' + (null == (__t = tab_icon) ? "" : __t) + ' tab-icon"></span>\n            </div>\n        </div>\n    ';
                    break;
                    case 2:
                            __p += '\n        <div id="ztb-fbc-show-widget" class="trigger-image ztb-fbc-tabimage">\n            ',
                        0 != !!tab_image && (__p += '\n                <img\n                    id="ztb-fbc-tabimage"\n                    width="' + __e(_.first(tab_image.size)) + '"\n                    height="' + __e(_.last(tab_image.size)) + '"\n                    src="' + __e(tab_image.cache_path) + '"\n                >\n            '),
                        __p += '\n            <div class="ztb-fbc-tabicon">\n                <span class="' + (null == (__t = tab_icon) ? "" : __t) + ' tab-icon"></span>\n            </div>\n        </div>\n        <div class="ztb-close-tabimage">\n            <span class="icon-075"></span>\n        </div>\n    ';
                        break;
                    case 3:
                            __p += '\n        \x3c!-- tab button --\x3e\n        <div id="ztb-fbc-show-widget" class="ztb-fbc-buttonstyle">\n            <span class="' + (null == (__t = tab_text_icon) ? "" : __t) + ' zb-tab-text-icon"></span>\n            <span class="zb-all-icon-x zb-tab-text-icon zb-fbc-chatbox-collapse-icon"></span>\n            <div class="zb-tab-content">\n                ' + (null == (__t = tab_text) ? "" : __t) + '\n            </div>\n            <div class="ztb-fbc-tabicon">\n                <span class="' + (null == (__t = tab_icon) ? "" : __t) + ' tab-icon"></span>\n            </div>\n        </div>\n    ';
                        break;
                    case 4:
                            __p += '\n        \x3c!-- tab icon --\x3e\n        <div id="ztb-fbc-show-widget" class="ztb-fbc-iconicstyle">\n            <span class="' + (null == (__t = tab_text_icon) ? "" : __t) + ' zb-tab-text-icon"></span>\n            <span class="zb-all-icon-x zb-tab-text-icon zb-fbc-chatbox-collapse-icon"></span>\n            <div class="ztb-fbc-tabicon">\n                <span class="' + (null == (__t = tab_icon) ? "" : __t) + ' tab-icon"></span>\n            </div>\n        </div>\n    '
                }
                __p += "\n</div>"
            }
            return __p
        }
    }), define("Widgets.FacebookChat.Default.CodeName", [], "facebook_chat"), define("Widgets.FacebookChat.Default.ClassName", [], "FacebookChat"), define("Widgets.FacebookChat.Default.ThemeName", [], "Default"), define("Widgets.FacebookChat.Default.Installer", [], function() {
        return function(n) {
            DOMAIN = Zotabox.getData().domain, CUSTOMER = Zotabox.getData().customer, ZOTABOX = Zotabox.getDomainURIs(), DOMAIN_STATIC_DIR = Zotabox.getDomainURIs().static + "/__" + Zotabox.getConfig().version, DOMAIN_CACHE_DIR = Zotabox.getDomainRoot() + "/" + Zotabox.getConfig().timestamp, _ = Zotabox._, async = Zotabox.async, Class = Zotabox.Class, Widget = Zotabox.Widget, DomainRules = Zotabox.DomainRules, Sly = Zotabox.Core.Sly, CookieManager = Zotabox.Core.CookieManager, Request = Zotabox.Core.Request, jQuery = Zotabox.Core.jQuery, Stats = Zotabox.Stats, Zotabox.require(["Widgets.FacebookChat.Default.CodeName", "Widgets.FacebookChat.Default.ClassName", "Widgets.FacebookChat.Default.ThemeName", "Widgets.FacebookChat.Default", "Widgets.FacebookChat.Default.Template"], function(t, e, a, o, i) {
                return n.apply(this, [null].concat(arguments))
            })
        }
    })
}.apply(Zotabox, [Zotabox.require, Zotabox.define]);