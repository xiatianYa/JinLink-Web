/** The global namespace for the app */
declare namespace App {
  /** Theme namespace */
  namespace Theme {
    type ColorPaletteNumber = import('@sa/color').ColorPaletteNumber;

    /** Theme setting */
    interface ThemeSetting {
      /** Theme scheme */
      themeScheme: UnionKey.ThemeScheme;
      /** grayscale mode */
      grayscale: boolean;
      /** colour weakness mode */
      colourWeakness: boolean;
      /** Whether to recommend color */
      recommendColor: boolean;
      /** Theme color */
      themeColor: string;
      /** Other color */
      otherColor: OtherColor;
      /** Whether info color is followed by the primary color */
      isInfoFollowPrimary: boolean;
      /** Layout */
      layout: {
        /** Layout mode */
        mode: UnionKey.ThemeLayoutMode;
        /** Scroll mode */
        scrollMode: UnionKey.ThemeScrollMode;
        /**
         * Whether to reverse the horizontal mix
         *
         * if true, the vertical child level menus in left and horizontal first level menus in top
         */
        reverseHorizontalMix?: boolean;
      };
      /** Page */
      page: {
        /** Whether to show the page transition */
        animate: boolean;
        /** Page animate mode */
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /** Header */
      header: {
        /** Header height */
        height: number;
        /** Header breadcrumb */
        breadcrumb: {
          /** Whether to show the breadcrumb */
          visible: boolean;
          /** Whether to show the breadcrumb icon */
          showIcon: boolean;
        };
      };
      /** Tab */
      tab: {
        /** Whether to show the tab */
        visible: boolean;
        /**
         * Whether to cache the tab
         *
         * If cache, the tabs will get from the local storage when the page is refreshed
         */
        cache: boolean;
        /** Tab height */
        height: number;
        /** Tab mode */
        mode: UnionKey.ThemeTabMode;
      };
      /** Fixed header and tab */
      fixedHeaderAndTab: boolean;
      /** Sider */
      sider: {
        /** Inverted sider */
        inverted: boolean;
        /** Sider width */
        width: number;
        /** Collapsed sider width */
        collapsedWidth: number;
        /** Sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixWidth: number;
        /** Collapsed sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixCollapsedWidth: number;
        /** Child menu width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixChildMenuWidth: number;
      };
      /** Footer */
      footer: {
        /** Whether to show the footer */
        visible: boolean;
        /** Whether fixed the footer */
        fixed: boolean;
        /** Footer height */
        height: number;
        /** Whether float the footer to the right when the layout is 'horizontal-mix' */
        right: boolean;
      };
      /** Watermark */
      watermark?: {
        /** Whether to show the watermark */
        visible: boolean;
        /** Watermark text */
        text: string;
      };
      /** define some theme settings tokens, will transform to css variables */
      tokens: {
        light: ThemeSettingToken;
        dark?: {
          [K in keyof ThemeSettingToken]?: Partial<ThemeSettingToken[K]>;
        };
      };
    }

    interface OtherColor {
      info: string;
      success: string;
      warning: string;
      error: string;
    }

    interface ThemeColor extends OtherColor {
      primary: string;
    }

    type ThemeColorKey = keyof ThemeColor;

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    type BaseToken = Record<string, Record<string, string>>;

    interface ThemeSettingTokenColor {
      /** the progress bar color, if not set, will use the primary color */
      nprogress?: string;
      container: string;
      layout: string;
      inverted: string;
      'base-text': string;
    }

    interface ThemeSettingTokenBoxShadow {
      header: string;
      sider: string;
      tab: string;
    }

    interface ThemeSettingToken {
      colors: ThemeSettingTokenColor;
      boxShadow: ThemeSettingTokenBoxShadow;
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor;

    /** Theme token CSS variables */
    type ThemeTokenCSSVars = {
      colors: ThemeTokenColor & { [key: string]: string };
      boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string };
    };
  }

  /** Global namespace */
  namespace Global {
    type VNode = import('vue').VNode;
    type RouteLocationNormalizedLoaded = import('vue-router').RouteLocationNormalizedLoaded;
    type RouteKey = import('@elegant-router/types').RouteKey;
    type RouteMap = import('@elegant-router/types').RouteMap;
    type RoutePath = import('@elegant-router/types').RoutePath;
    type LastLevelRouteKey = import('@elegant-router/types').LastLevelRouteKey;

    /** The global header props */
    interface HeaderProps {
      /** Whether to show the logo */
      showLogo?: boolean;
      /** Whether to show the menu toggler */
      showMenuToggler?: boolean;
      /** Whether to show the menu */
      showMenu?: boolean;
    }

    /** The global menu */
    type Menu = {
      /**
       * The menu key
       *
       * Equal to the route key
       */
      key: string;
      /** The menu label */
      label: string;
      /** The menu i18n key */
      i18nKey?: I18n.I18nKey | null;
      /** The route key */
      routeKey: RouteKey;
      /** The route path */
      routePath: RoutePath;
      /** The menu icon */
      icon?: () => VNode;
      /** The menu children */
      children?: Menu[];
    };

    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[];
    };

    /** Tab route */
    type TabRoute = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> &
      Partial<Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'query' | 'matched'>>;

    /** The global tab */
    type Tab = {
      /** The tab id */
      id: string;
      /** The tab label */
      label: string;
      /**
       * The new tab label
       *
       * If set, the tab label will be replaced by this value
       */
      newLabel?: string;
      /**
       * The old tab label
       *
       * when reset the tab label, the tab label will be replaced by this value
       */
      oldLabel?: string;
      /** The tab route key */
      routeKey: LastLevelRouteKey;
      /** The tab route path */
      routePath: RouteMap[LastLevelRouteKey];
      /** The tab route full path */
      fullPath: string;
      /** The tab fixed index */
      fixedIndex?: number | null;
      /**
       * Tab icon
       *
       * Iconify icon
       */
      icon?: string;
      /**
       * Tab local icon
       *
       * Local icon
       */
      localIcon?: string;
      /** I18n key */
      i18nKey?: I18n.I18nKey | null;
    };

    /** Form rule */
    type FormRule = import('naive-ui').FormItemRule;

    /** The global dropdown key */
    type DropdownKey = 'closeCurrent' | 'closeOther' | 'closeLeft' | 'closeRight' | 'closeAll';
  }

  /**
   * I18n namespace
   *
   * Locales type
   */
  namespace I18n {
    type RouteKey = import('@elegant-router/types').RouteKey;

    type LangType = 'en-US' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };

    type I18nRouteKey = Exclude<RouteKey, 'root' | 'not-found'>;

    type FormMsg = {
      required: string;
      invalid: string;
    };

    type Schema = {
      system: {
        title: string;
        updateTitle: string;
        updateContent: string;
        updateConfirm: string;
        updateCancel: string;
      };
      common: {
        action: string;
        add: string;
        copy: string;
        save: string;
        addSuccess: string;
        backToHome: string;
        batchDelete: string;
        batchDeleteAll: string;
        cancel: string;
        close: string;
        check: string;
        expandColumn: string;
        columnSetting: string;
        config: string;
        confirm: string;
        delete: string;
        deleteSuccess: string;
        confirmDelete: string;
        edit: string;
        warning: string;
        error: string;
        index: string;
        keywordSearch: string;
        logout: string;
        logoutConfirm: string;
        lookForward: string;
        modify: string;
        modifySuccess: string;
        noData: string;
        operate: string;
        pleaseCheckValue: string;
        refresh: string;
        reset: string;
        search: string;
        switch: string;
        tip: string;
        trigger: string;
        update: string;
        updateSuccess: string;
        userCenter: string;
        resetUserName: string;
        push: string;
        confirmPublish: string;
        publish: string;
        yesOrNo: {
          yes: string;
          no: string;
        };
      };
      request: {
        logout: string;
        logoutMsg: string;
        logoutWithModal: string;
        logoutWithModalMsg: string;
        refreshToken: string;
        tokenExpired: string;
      };
      theme: {
        themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
        grayscale: string;
        colourWeakness: string;
        layoutMode: { title: string; reverseHorizontalMix: string } & Record<UnionKey.ThemeLayoutMode, string>;
        recommendColor: string;
        recommendColorDesc: string;
        themeColor: {
          title: string;
          followPrimary: string;
        } & Theme.ThemeColor;
        scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
        page: {
          animate: string;
          mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
        };
        fixedHeaderAndTab: string;
        header: {
          height: string;
          breadcrumb: {
            visible: string;
            showIcon: string;
          };
        };
        tab: {
          visible: string;
          cache: string;
          height: string;
          mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
        };
        sider: {
          inverted: string;
          width: string;
          collapsedWidth: string;
          mixWidth: string;
          mixCollapsedWidth: string;
          mixChildMenuWidth: string;
        };
        footer: {
          visible: string;
          fixed: string;
          height: string;
          right: string;
        };
        watermark: {
          visible: string;
          text: string;
        };
        themeDrawerTitle: string;
        pageFunTitle: string;
        configOperation: {
          copyConfig: string;
          copySuccessMsg: string;
          resetConfig: string;
          resetSuccessMsg: string;
        };
      };
      route: Record<I18nRouteKey, string>;
      page: {
        login: {
          common: {
            loginOrRegister: string;
            userNamePlaceholder: string;
            avatarPlaceholder: string;
            userNickNamePlaceholder: string;
            phonePlaceholder: string;
            codePlaceholder: string;
            getCodePlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            codeLogin: string;
            confirm: string;
            back: string;
            validateSuccess: string;
            loginSuccess: string;
            welcomeBack: string;
            registerSuccess: string;
          };
          pwdLogin: {
            title: string;
            rememberMe: string;
            forgetPassword: string;
            register: string;
            otherAccountLogin: string;
            otherLoginMode: string;
            qq: string;
          };
          codeLogin: {
            title: string;
            getCode: string;
            reGetCode: string;
            sendCodeSuccess: string;
            imageCodePlaceholder: string;
          };
          register: {
            title: string;
            agreement: string;
            protocol: string;
            policy: string;
          };
          resetPwd: {
            title: string;
          };
          bindWeChat: {
            title: string;
          };
        };
        about: {
          title: string;
          introduction: string;
          projectInfo: {
            title: string;
            version: string;
            latestBuildTime: string;
            githubLink: string;
            previewLink: string;
          };
          prdDep: string;
          devDep: string;
        };
        home: {
          greeting: string;
          webSiteDesc: string;
          pieChart: string;
          sponsor: {
            title: string;
            sponsorRecord: string;
            name: string;
            amount: string;
            time: string;
            desc: string;
          };
          projectNews: {
            title: string;
            moreNews: string;
            desc1: string;
            desc2: string;
            desc3: string;
            desc4: string;
            desc5: string;
            desc6: string;
            desc7: string;
            desc8: string;
            desc9: string;
            desc10: string;
            desc11: string;
          };
          onlineUser: string;
        };
        tool: {
          bind: {
            key: string;
            value: string;
            saveCfg: string;
            exportCfg: string;
            editMode: string;
          };
          mapOrder: {
            add: string;
            test: string;
            mapName: string;
            mapPush: string;
            form: {
              mapName: string;
            };
          };
          mapDisplay: {
            mapName: string;
            loadModel: string;
          };
          skinDisplay: {
            loadModel: string;
            weaponModel: string;
            characterModel: string;
          };
          obs: {
            fontSize: string;
            fontColor: string;
            fontShadow: string;
            obsLink: string;
            fontAlign: string;
            showMap: string;
            customText: string;
            fontFamily: string;
            fontShadowWidth: string;
          };
        };
        manage: {
          common: {
            status: {
              enable: string;
              disable: string;
            };
          };
          role: {
            title: string;
            roleName: string;
            roleCode: string;
            roleStatus: string;
            roleDesc: string;
            form: {
              roleName: string;
              roleCode: string;
              roleStatus: string;
              roleDesc: string;
            };
            addRole: string;
            editRole: string;
            menuAuth: string;
            buttonAuth: string;
          };
          user: {
            title: string;
            userName: string;
            userGender: string;
            nickName: string;
            userPhone: string;
            userEmail: string;
            userStatus: string;
            userRole: string;
            form: {
              userName: string;
              userGender: string;
              nickName: string;
              userPhone: string;
              userEmail: string;
              userStatus: string;
              userRole: string;
            };
            addUser: string;
            editUser: string;
            gender: {
              male: string;
              female: string;
            };
          };
          menu: {
            home: string;
            title: string;
            id: string;
            parentId: string;
            menuType: string;
            menuName: string;
            routeName: string;
            routePath: string;
            pathParam: string;
            layout: string;
            page: string;
            i18nKey: string;
            icon: string;
            localIcon: string;
            iconTypeTitle: string;
            order: string;
            constant: string;
            keepAlive: string;
            href: string;
            hideInMenu: string;
            activeMenu: string;
            multiTab: string;
            fixedIndexInTab: string;
            query: string;
            button: string;
            buttonCode: string;
            buttonDesc: string;
            menuStatus: string;
            form: {
              home: string;
              menuType: string;
              menuName: string;
              routeName: string;
              routePath: string;
              pathParam: string;
              layout: string;
              page: string;
              i18nKey: string;
              icon: string;
              localIcon: string;
              order: string;
              keepAlive: string;
              href: string;
              hideInMenu: string;
              activeMenu: string;
              multiTab: string;
              fixedInTab: string;
              fixedIndexInTab: string;
              queryKey: string;
              queryValue: string;
              button: string;
              buttonCode: string;
              buttonDesc: string;
              menuStatus: string;
            };
            addMenu: string;
            editMenu: string;
            addChildMenu: string;
            type: {
              directory: string;
              menu: string;
            };
            iconType: {
              iconify: string;
              local: string;
            };
          };
          dict: {
            title: string;
            name: string;
            code: string;
            type: string;
            sort: string;
            description: string;
            status: string;
            form: {
              name: string;
              code: string;
              type: string;
              sort: string;
              description: string;
              status: string;
            };
            addDict: string;
            editDict: string;
            dictType: {
              system: string;
              business: string;
            };
            loadCacheSuccess: string;
            selectTreeIsEmptyTip: string;
            systemFieldsCannotBeDeleted: string;
          };
          dictItem: {
            title: string;
            dictCode: string;
            value: string;
            zhCN: string;
            enUS: string;
            sort: string;
            type: string;
            color: string;
            description: string;
            status: string;
            form: {
              value: string;
              zhCN: string;
              enUS: string;
              sort: string;
              type: string;
              color: string;
              description: string;
              status: string;
            };
            addDictItem: string;
            editDictItem: string;
          };
        };
        monitor: {
          percentage: string;
          scheduler: {
            title: string;
            jobName: string;
            jobGroup: string;
            triggerName: string;
            triggerGroup: string;
            jobData: string;
            triggerData: string;
            addScheduler: string;
            editScheduler: string;
            corn: string;
            jobClassName: string;
            status: string;
            form: {
              jobName: string;
              jobGroup: string;
              triggerName: string;
              triggerGroup: string;
              jobData: string;
              triggerData: string;
              corn: string;
              jobClassName: string;
              status: string;
            };
          };
          system: {
            status: string;
            cpuUserUsage: string;
            cpuSystemUsage: string;
            systemMemoryUsage: string;
            jvmMemoryUsage: string;
            operatingSystem: {
              title: string;
              name: string;
              manufacturer: string;
              arch: string;
              systemBootTime: string;
              systemUptime: string;
            };
            centralProcessor: {
              title: string;
              name: string;
              physicalProcessorCount: string;
              logicalProcessorCount: string;
              processorIdentifier: string;
              vendorFreq: string;
              userPercent: string;
              systemPercent: string;
              idlePercent: string;
            };
            globalMemory: {
              title: string;
              total: string;
              used: string;
              available: string;
              swapTotal: string;
              swapUsed: string;
              swapFree: string;
              memoryUsedRate: string;
              swapUsedRate: string;
            };
            jvm: {
              title: string;
              vmName: string;
              uptime: string;
              vmVersion: string;
              vmVendor: string;
              startTime: string;
              inputArguments: string;
              heapMemoryUsed: string;
              heapMemoryMax: string;
              memoryUsageRate: string;
              nonHeapMemoryUsed: string;
            };
            fileStore: {
              title: string;
              name: string;
              type: string;
              mount: string;
              totalSpace: string;
              usableSpace: string;
              usedSpace: string;
              usedPercentage: string;
            };
            process: {
              title: string;
              processID: string;
              name: string;
              cpuLoad: string;
            };
          };
          cache: {
            redis: {
              title: string;
              version: string;
              uptime: string;
              connectedClients: string;
              usedMemory: string;
              maxMemory: string;
              memoryUsageRate: string;
              memFragmentationRatio: string;
              totalCommandsProcessed: string;
              echartsTitle: string;
              echartsSubTitle: string;
            };
          };
          logs: {
            login: {
              userName: string;
              userRealName: string;
              ip: string;
              ipAddr: string;
              userAgent: string;
              status: string;
              message: string;
              createTime: string;
              createUser: string;
              form: {
                userName: string;
                userRealName: string;
              };
              loginStatus: {
                fail: string;
                success: string;
              };
            };
            operation: {
              requestId: string;
              ip: string;
              ipAddr: string;
              userAgent: string;
              requestUri: string;
              requestMethod: string;
              contentType: string;
              operation: string;
              methodName: string;
              methodParams: string;
              useTime: string;
              createUser: string;
              createTime: string;
              form: {
                createUser: string;
              };
            };
            error: {
              requestId: string;
              ip: string;
              ipAddr: string;
              userAgent: string;
              requestUri: string;
              requestMethod: string;
              contentType: string;
              operation: string;
              methodName: string;
              methodParams: string;
              useTime: string;
              createUser: string;
              createTime: string;
              exceptionMessage: string;
              exceptionClass: string;
              line: string;
              stackTrace: string;
              form: {
                createUser: string;
              };
            };
            scheduler: {
              jobName: string;
              jobGroup: string;
              useTime: string;
              status: string;
              createTime: string;
              exceptionMessage: string;
              exceptionClass: string;
              line: string;
              stackTrace: string;
              executeStatus: {
                success: string;
                fail: string;
              };
              form: {
                jobName: string;
              };
            };
            file: {
              userId: string;
              userName: string;
              fileUrl: string;
              fileSize: string;
              status: string;
              form: {
                userId: string;
                userName: string;
                fileUrl: string;
                fileSize: string;
                status: string;
              };
            };
          };
        };
        tools: {
          common: {
            renderType: {
              input: string;
              select: string;
              radio: string;
            };
            searchType: {
              equal: string;
              noEqual: string;
              like: string;
              leftLike: string;
              rightLike: string;
              greaterThan: string;
              greaterThanOrEqual: string;
              lessThan: string;
              lessThanOrEqual: string;
              in: string;
              notIn: string;
              between: string;
              notBetween: string;
            };
          };
        };
        game: {
          community: {
            addCommunity: string;
            editCommunity: string;
            communityName: string;
            logo: string;
            website: string;
            bind: string;
            form: {
              communityName: string;
              logo: string;
              website: string;
              bind: string;
            };
          };
          game: {
            gameName: string;
            addGame: string;
            editGame: string;
            form: {
              gameName: string;
            };
          };
          mode: {
            modeName: string;
            addMode: string;
            editMode: string;
            form: {
              modeName: string;
            };
          };
          server: {
            serverName: string;
            communityId: string;
            modeId: string;
            gameId: string;
            ip: string;
            port: string;
            addServer: string;
            editServer: string;
            players: string;
            addr: string;
            version: string;
            connectStr: string;
            isStatistics: string;
            form: {
              serverName: string;
              communityId: string;
              modeId: string;
              gameId: string;
              ip: string;
              port: string;
              connectStr: string;
              isStatistics: string;
            };
          };
          map: {
            mapName: string;
            mapLabel: string;
            mapUrl: string;
            mapModeUrl: string;
            modeId: string;
            type: string;
            tag: string;
            artifact: string;
            addMap: string;
            editMap: string;
            mapCd: string;
            mapAchievement: string;
            form: {
              mapName: string;
              mapLabel: string;
              mapUrl: string;
              mapModeUrl: string;
              modeId: string;
              type: string;
              tag: string;
              artifact: string;
              desc: string;
            };
          };
          live: {
            uid: string;
            avatar: string;
            bgUrl: string;
            addLive: string;
            editLive: string;
            notLive: string;
            enterLive: string;
            joinLive: string;
            form: {
              uid: string;
              avatar: string;
              bgUrl: string;
            };
          };
          model: {
            modelName: string;
            modelType: string;
            modelUrl: string;
            modelModeUrl: string;
            modelModeMaterial: string;
            addModel: string;
            editModel: string;
            form: {
              modelName: string;
              modelType: string;
              modelUrl: string;
              modelModeUrl: string;
            };
          };
          mapStrategy: {
            title: string;
            mapId: string;
            mapLabel: string;
            videoUrl: string;
            status: string;
            createTime: string;
            userName: string;
            form: {
              title: string;
              mapId: string;
              mapLabel: string;
              videoUrl: string;
              status: string;
            };
          };
        };
        server: {
          csgo2: {
            title: string;
          };
        };
        feedback: {
          userName: string;
          content: string;
          image: string;
          type: string;
          status: string;
          feedback: string;
          addFeedback: string;
          editFeedback: string;
          form: {
            content: string;
            image: string;
            type: string;
            status: string;
            feedback: string;
          };
        };
        userCenter: {
          userInfo: {
            userName: string;
            userAvatar: string;
            password: string;
            nickName: string;
            phone: string;
            email: string;
            gender: string;
            communityPreference: string;
            modePreference: string;
            personalInfo: string;
            changePassword: string;
            gameConfig: string;
            basicInfo: string;
            edit: string;
            oldPassword: string;
            newPassword: string;
            confirmPassword: string;
            restartUserName: string;
            restartUserNameConfirm: string;
            form: {
              userName: string;
              userAvatar: string;
              password: string;
              communityPreferencePlaceholder: string;
              modePreferencePlaceholder: string;
              oldPasswordPlaceholder: string;
              newPasswordPlaceholder: string;
              confirmPasswordPlaceholder: string;
            };
          };
        };
      };
      form: {
        required: string;
        userName: FormMsg;
        nickName: FormMsg;
        avatar: FormMsg;
        phone: FormMsg;
        pwd: FormMsg;
        confirmPwd: FormMsg;
        code: FormMsg;
        email: FormMsg;
      };
      dropdown: Record<Global.DropdownKey, string>;
      icon: {
        themeConfig: string;
        themeSchema: string;
        lang: string;
        fullscreen: string;
        fullscreenExit: string;
        reload: string;
        collapse: string;
        expand: string;
        pin: string;
        unpin: string;
      };
      datatable: {
        itemCount: string;
      };
    };

    type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never;

    type I18nKey = GetI18nKey<Schema>;

    type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>;

    interface $T {
      (key: I18nKey): string;
      (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], plural: number): string;
      (key: I18nKey, list: unknown[], defaultMsg: string): string;
      (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, named: Record<string, unknown>, plural: number): string;
      (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
    }
  }

  /** Service namespace */
  namespace Service {
    /** Other baseURL key */
    type OtherBaseURLKey = 'demo';

    interface ServiceConfigItem {
      /** The backend service base url */
      baseURL: string;
      /** The proxy pattern of the backend service base url */
      proxyPattern: string;
    }

    interface OtherServiceConfigItem extends ServiceConfigItem {
      key: OtherBaseURLKey;
    }

    /** The backend service config */
    interface ServiceConfig extends ServiceConfigItem {
      /** Other backend service config */
      other: OtherServiceConfigItem[];
    }

    interface SimpleServiceConfig extends Pick<ServiceConfigItem, 'baseURL'> {
      other: Record<OtherBaseURLKey, string>;
    }

    /** The backend service response data */
    type Response<T = unknown> = {
      /** The backend service response code */
      code: string;
      /** The backend service response message */
      msg: string;
      /** The backend service response data */
      data: T;
    };

    /** The demo backend service response data */
    type DemoResponse<T = unknown> = {
      /** The backend service response code */
      status: string;
      /** The backend service response message */
      message: string;
      /** The backend service response data */
      result: T;
    };
  }
}
