const local: App.I18n.Schema = {
  system: {
    title: 'BlueArchiveLogin',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    batchDeleteAll: 'Clear List',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    edit: 'Edit',
    warning: 'Warning',
    error: 'Error',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    userCenter: 'User Center',
    confirmPublish: 'Are you sure you want to publish?',
    publish: 'Publish',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    },
    resetUserName: 'Reset Account',
    push: 'Push',
    copy: 'Copy',
    save: 'Save'
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeSchema: {
      title: 'Theme Schema',
      light: 'Light',
      dark: 'Dark',
      auto: 'Follow System'
    },
    grayscale: 'Grayscale',
    colourWeakness: 'Colour Weakness',
    layoutMode: {
      title: 'Layout Mode',
      vertical: 'Vertical Menu Mode',
      horizontal: 'Horizontal Menu Mode',
      'vertical-mix': 'Vertical Mix Menu Mode',
      'horizontal-mix': 'Horizontal Mix menu Mode',
      reverseHorizontalMix: 'Reverse first level menus and child level menus position'
    },
    recommendColor: 'Apply Recommended Color Algorithm',
    recommendColorDesc: 'The recommended color algorithm refers to',
    themeColor: {
      title: 'Theme Color',
      primary: 'Primary',
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      followPrimary: 'Follow Primary'
    },
    scrollMode: {
      title: 'Scroll Mode',
      wrapper: 'Wrapper',
      content: 'Content'
    },
    page: {
      animate: 'Page Animate',
      mode: {
        title: 'Page Animate Mode',
        fade: 'Fade',
        'fade-slide': 'Slide',
        'fade-bottom': 'Fade Zoom',
        'fade-scale': 'Fade Scale',
        'zoom-fade': 'Zoom Fade',
        'zoom-out': 'Zoom Out',
        none: 'None'
      }
    },
    fixedHeaderAndTab: 'Fixed Header And Tab',
    header: {
      height: 'Header Height',
      breadcrumb: {
        visible: 'Breadcrumb Visible',
        showIcon: 'Breadcrumb Icon Visible'
      }
    },
    tab: {
      visible: 'Tab Visible',
      cache: 'Tab Cache',
      height: 'Tab Height',
      mode: {
        title: 'Tab Mode',
        chrome: 'Chrome',
        button: 'Button'
      }
    },
    sider: {
      inverted: 'Dark Sider',
      width: 'Sider Width',
      collapsedWidth: 'Sider Collapsed Width',
      mixWidth: 'Mix Sider Width',
      mixCollapsedWidth: 'Mix Sider Collapse Width',
      mixChildMenuWidth: 'Mix Child Menu Width'
    },
    footer: {
      visible: 'Footer Visible',
      fixed: 'Fixed Footer',
      height: 'Footer Height',
      right: 'Right Footer'
    },
    watermark: {
      visible: 'Watermark Full Screen Visible',
      text: 'Watermark Text'
    },
    themeDrawerTitle: 'Theme Configuration',
    pageFunTitle: 'Page Function',
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    'user-center': 'User Center',
    about: 'About',
    manage: 'System Manage',
    manage_user: 'User Manage',
    'manage_user-detail': 'User Detail',
    manage_role: 'Role Manage',
    manage_menu: 'Menu Manage',
    monitor: 'Monitoring management',
    monitor_scheduler: 'Scheduling tasks',
    monitor_system: 'System Monitor',
    monitor_cache: 'Cache Monitor',
    monitor_logs: 'Logs Monitor',
    monitor_logs_login: 'Login logs Monitor',
    manage_dict: 'Dict Manage',
    monitor_logs_scheduler: 'Logs Scheduler Monitor',
    monitor_logs_error: 'Logs Error Monitor',
    monitor_logs_operation: 'Logs Operation Monitor',
    monitor_logs_file: 'Logs File Monitor',
    game: 'Game Manage',
    game_community: 'Community Manager',
    game_game: 'Game Game Manage',
    game_mode: 'Game Mode Manage',
    game_server: 'Game Server Manage',
    game_map: 'Gaem Map Manage',
    game_live: 'Game Live Manage',
    server: 'Server Query',
    server_csgo: 'Counter-Strike 2',
    live: 'Live',
    tool: 'Tool',
    tool_bind: 'Bind Key',
    community: 'Community',
    map: 'Map',
    server_projectzombie: 'Project Zombie',
    server_7daystodie: '7 Days To Die',
    tool_maporder: 'Map Order',
    reservation: 'Reservation',
    reservation_feedback: 'Feedback',
    server_minecraft: 'Minecraft',
    tool_mapdisplay: 'Map Display',
    tool_skindisplay: 'Skin Display',
    game_model: 'Game Model Manager',
    tool_obs: 'OBS Live Config',
    obs: 'OBS',
    tool_soft: 'Login Software Version',
    tool_qqgroup: 'QQ Group',
    mapstrategy: 'Map Strategy Article',
    mapstrategy_edit: 'Map Strategy Edit',
    mapstrategy_list: 'Map Strategy List'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        userNamePlaceholder: 'Please enter user name',
        avatarPlaceholder: 'Please enter avatar',
        userNickNamePlaceholder: 'Please enter nickname',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        getCodePlaceholder: 'Get verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !',
        registerSuccess: 'Register successfully'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        forgetPassword: 'Forget password?',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        qq: 'QQ'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    about: {
      title: 'About',
      introduction: `SoybeanAdmin is an elegant and powerful admin template, based on the latest front-end technology stack, including Vue3, Vite5, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. SoybeanAdmin provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.`,
      projectInfo: {
        title: 'Project Info',
        version: 'Version',
        latestBuildTime: 'Latest Build Time',
        githubLink: 'Github Link',
        previewLink: 'Preview Link'
      },
      prdDep: 'Production Dependency',
      devDep: 'Development Dependency'
    },
    home: {
      greeting: 'Good morning, {userName}, today is another day full of vitality!',
      webSiteDesc: 'Welcome to the blue archive login server! 🌈',
      pieChart: 'Community Online Pie Chart',
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'Summer rebuilt the blue archive login server on November 18, 2024!',
        desc2: 'Optimized automatic server frame, after closing the server frame, it will continue to try to squeeze!',
        desc3: 'Added map subscription function',
        desc4: 'Added feedback function',
        desc5:
          'Added personal center, you can go to reset account, set default community preferences, mode preferences, etc.',
        desc6:
          'Added 3D map display, 3D skin display, optimized community preference settings (can add multiple communities, multiple modes)',
        desc7: 'Added user avatar modification, you can modify it in the personal center',
        desc8:
          'Added warm server push (can push all online users of the login server), optimized bind key assistant, permanently save configuration, and export cfg file after saving',
        desc9: 'Added OBS live plugin, you can go to the tool-OBS live plugin to configure',
        desc10: ''
      },
      onlineUser: 'Online User',
      sponsor: {
        title: 'Sponsor',
        name: 'Name',
        amount: 'Amount',
        time: 'Time',
        desc: 'The sponsorship fee will be used for (website maintenance, robot maintenance) and to invite me to eat KFC, O(∩_∩)O, thank you all the big guys for the sponsorship.',
        sponsorRecord: 'Sponsor Record'
      }
    },
    manage: {
      common: {
        status: {
          enable: 'Enable',
          disable: 'Disable'
        }
      },
      role: {
        title: 'Role List',
        roleName: 'Role Name',
        roleCode: 'Role Code',
        roleStatus: 'Role Status',
        roleDesc: 'Role Description',
        menuAuth: 'Menu Auth',
        buttonAuth: 'Button Auth',
        form: {
          roleName: 'Please enter role name',
          roleCode: 'Please enter role code',
          roleStatus: 'Please select role status',
          roleDesc: 'Please enter role description'
        },
        addRole: 'Add Role',
        editRole: 'Edit Role'
      },
      user: {
        title: 'User List',
        userName: 'User Name',
        userGender: 'Gender',
        nickName: 'Nick Name',
        userPhone: 'Phone Number',
        userEmail: 'Email',
        userStatus: 'User Status',
        userRole: 'User Role',
        form: {
          userName: 'Please enter user name',
          userGender: 'Please select gender',
          nickName: 'Please enter nick name',
          userPhone: 'Please enter phone number',
          userEmail: 'Please enter email',
          userStatus: 'Please select user status',
          userRole: 'Please select user role'
        },
        addUser: 'Add User',
        editUser: 'Edit User',
        gender: {
          male: 'Male',
          female: 'Female'
        }
      },
      menu: {
        home: 'Home',
        title: 'Menu List',
        id: 'ID',
        parentId: 'Parent ID',
        menuType: 'Menu Type',
        menuName: 'Menu Name',
        routeName: 'Route Name',
        routePath: 'Route Path',
        pathParam: 'Path Param',
        layout: 'Layout Component',
        page: 'Page Component',
        i18nKey: 'I18n Key',
        icon: 'Icon',
        localIcon: 'Local Icon',
        iconTypeTitle: 'Icon Type',
        order: 'Order',
        constant: 'Constant',
        keepAlive: 'Keep Alive',
        href: 'Href',
        hideInMenu: 'Hide In Menu',
        activeMenu: 'Active Menu',
        multiTab: 'Multi Tab',
        fixedIndexInTab: 'Fixed Index In Tab',
        query: 'Query Params',
        button: 'Button',
        buttonCode: 'Button Code',
        buttonDesc: 'Button Desc',
        menuStatus: 'Menu Status',
        form: {
          home: 'Please select home',
          menuType: 'Please select menu type',
          menuName: 'Please enter menu name',
          routeName: 'Please enter route name',
          routePath: 'Please enter route path',
          pathParam: 'Please enter path param',
          page: 'Please select page component',
          layout: 'Please select layout component',
          i18nKey: 'Please enter i18n key',
          icon: 'Please enter iconify name',
          localIcon: 'Please enter local icon name',
          order: 'Please enter order',
          keepAlive: 'Please select whether to cache route',
          href: 'Please enter href',
          hideInMenu: 'Please select whether to hide menu',
          activeMenu: 'Please select route name of the highlighted menu',
          multiTab: 'Please select whether to support multiple tabs',
          fixedInTab: 'Please select whether to fix in the tab',
          fixedIndexInTab: 'Please enter the index fixed in the tab',
          queryKey: 'Please enter route parameter Key',
          queryValue: 'Please enter route parameter Value',
          button: 'Please select whether it is a button',
          buttonCode: 'Please enter button code',
          buttonDesc: 'Please enter button description',
          menuStatus: 'Please select menu status'
        },
        addMenu: 'Add Menu',
        editMenu: 'Edit Menu',
        addChildMenu: 'Add Child Menu',
        type: {
          directory: 'Directory',
          menu: 'Menu'
        },
        iconType: {
          iconify: 'Iconify Icon',
          local: 'Local Icon'
        }
      },
      dict: {
        title: 'Dictionary List',
        name: 'Dictionary Name',
        code: 'Dictionary Code',
        type: 'Dictionary Type',
        description: 'Dictionary Description',
        sort: 'Sort',
        status: 'Dictionary Status',
        form: {
          name: 'Please enter dictionary name',
          code: 'Please enter dictionary code',
          type: 'Please select dictionary type',
          description: 'Please enter dictionary description',
          sort: 'Please enter sort',
          status: 'Please select dictionary status'
        },
        addDict: 'Add Dictionary',
        editDict: 'Edit Dictionary',
        dictType: {
          system: 'System Dictionary',
          business: 'Business Dictionary'
        },
        loadCacheSuccess: 'Cache Success',
        selectTreeIsEmptyTip: 'Please select dictionary to view sub items',
        systemFieldsCannotBeDeleted: 'System fields cannot be deleted'
      },
      dictItem: {
        title: 'Dictionary Item List',
        dictCode: 'Dictionary Code',
        value: 'Dictionary Value',
        zhCN: 'Chinese',
        enUS: 'English',
        color: 'Color',
        sort: 'Sort',
        type: 'Type',
        status: 'Status',
        description: 'Description',
        form: {
          value: 'Please enter dictionary value',
          zhCN: 'Please enter dictionary item Chinese',
          enUS: 'Please enter dictionary item English',
          color: 'Please select color',
          type: 'Please select type',
          sort: 'Please enter sort',
          status: 'Please select dictionary item status',
          description: 'Please enter dictionary description'
        },
        addDictItem: 'Add Dictionary Item',
        editDictItem: 'Edit Dictionary Item'
      }
    },
    monitor: {
      percentage: '{value} %',
      scheduler: {
        title: 'Scheduler List',
        jobName: 'Job Name',
        jobGroup: 'Job Group',
        triggerName: 'Trigger Name',
        triggerGroup: 'Trigger Group',
        jobData: 'Job Data',
        triggerData: 'Trigger Data',
        addScheduler: 'Add Scheduler Task',
        editScheduler: 'Edit Scheduler Task',
        corn: 'Corn',
        jobClassName: 'Job Class Name',
        status: 'Status',
        form: {
          jobName: 'Please enter job name',
          jobGroup: 'Please enter job group',
          triggerName: 'Please enter trigger name',
          triggerGroup: 'Please enter trigger group',
          jobData: 'Please enter job data',
          triggerData: 'Please enter trigger data',
          corn: 'Please enter corn',
          jobClassName: 'Please enter job class name',
          status: 'Please select status'
        }
      },
      system: {
        status: 'System Status',
        cpuUserUsage: 'CPU User Usage',
        cpuSystemUsage: 'CPU System Usage',
        systemMemoryUsage: 'System Memory Usage',
        jvmMemoryUsage: 'JVM Memory Usage',
        operatingSystem: {
          title: 'System Info',
          name: 'Operating System',
          manufacturer: 'System Manufacturer',
          arch: 'System Architecture',
          systemBootTime: 'System Boot Time',
          systemUptime: 'System Uptime'
        },
        centralProcessor: {
          title: 'Central Processor',
          name: 'CPU Name',
          physicalProcessorCount: 'Physical Core Count',
          logicalProcessorCount: 'Logical Core Count (Including Hyper-Threading)',
          processorIdentifier: 'Processor Identifier',
          vendorFreq: 'CPU Frequency',
          userPercent: 'User Usage',
          systemPercent: 'System Usage',
          idlePercent: 'Idle Rate'
        },
        globalMemory: {
          title: 'System Memory',
          total: 'Total',
          used: 'Used',
          available: 'Available',
          swapTotal: 'Swap Total',
          swapUsed: 'Swap Used',
          swapFree: 'Swap Free',
          memoryUsedRate: 'Memory Used Rate',
          swapUsedRate: 'Swap Used Rate'
        },
        jvm: {
          title: 'JVM Memory',
          vmName: 'Name',
          uptime: 'Uptime',
          vmVersion: 'Version',
          vmVendor: 'Vendor',
          startTime: 'Start Time',
          inputArguments: 'Input Arguments',
          heapMemoryUsed: 'Heap Memory Used',
          heapMemoryMax: 'Heap Memory Max',
          memoryUsageRate: 'Memory Usage Rate',
          nonHeapMemoryUsed: 'Non Heap Memory Used'
        },
        fileStore: {
          title: 'File Store',
          name: 'Name',
          type: 'Type',
          mount: 'Mount',
          totalSpace: 'Total Space',
          usableSpace: 'Usable Space',
          usedSpace: 'Used Space',
          usedPercentage: 'Used Percentage'
        },
        process: {
          title: 'System Top 6 Processes',
          processID: 'Process ID',
          name: 'Name',
          cpuLoad: 'CPU Load'
        }
      },
      cache: {
        redis: {
          title: 'Redis Cache Info',
          version: 'Version',
          uptime: 'Uptime',
          connectedClients: 'Connected Clients',
          usedMemory: 'Used Memory',
          maxMemory: 'Max Memory',
          memoryUsageRate: 'Memory Usage Rate',
          memFragmentationRatio: 'Memory Fragmentation Ratio',
          totalCommandsProcessed: 'Total Commands Processed',
          echartsTitle: 'Command Statistics',
          echartsSubTitle: 'Show the proportion of each command execution'
        }
      },
      logs: {
        login: {
          userName: 'User Name',
          userRealName: 'Real Name',
          ip: 'Login IP',
          ipAddr: 'IP Location',
          userAgent: 'User-Agent',
          status: 'Login Status',
          message: 'Login Message',
          createTime: 'Login Time',
          createUser: 'Login User',
          form: {
            userName: 'Please enter user name',
            userRealName: 'Please enter real name'
          },
          loginStatus: {
            fail: 'Login Failed',
            success: 'Login Success'
          }
        },
        operation: {
          requestId: 'Request ID',
          ip: 'Operation IP',
          ipAddr: 'IP Location',
          userAgent: 'User-Agent',
          requestUri: 'Request URI',
          requestMethod: 'Request Method',
          contentType: 'Content Type',
          methodName: 'Method Name',
          operation: 'Operation',
          methodParams: 'Method Params',
          useTime: 'Use Time(ms)',
          createUser: 'Operation User',
          createTime: 'Operation Time',
          form: {
            createUser: 'Please enter operation user'
          }
        },
        error: {
          requestId: 'Request ID',
          ip: 'Operation IP',
          ipAddr: 'IP Location',
          userAgent: 'User-Agent',
          requestUri: 'Request URI',
          requestMethod: 'Request Method',
          contentType: 'Content Type',
          methodName: 'Method Name',
          operation: 'Operation',
          methodParams: 'Method Params',
          useTime: 'Use Time(ms)',
          createUser: 'Operation User',
          createTime: 'Exception Time',
          exceptionMessage: 'Exception Message',
          exceptionClass: 'Exception Class',
          line: 'Exception Line',
          stackTrace: 'Exception Stack',
          form: {
            createUser: 'Please enter operation user'
          }
        },
        scheduler: {
          jobName: 'Job Name',
          jobGroup: 'Job Group',
          useTime: 'Use Time(ms)',
          status: 'Execution Status',
          createTime: 'Execution Time',
          exceptionMessage: 'Exception Message',
          exceptionClass: 'Exception Class',
          line: 'Exception Line',
          stackTrace: 'Exception Stack',
          executeStatus: {
            success: 'Success',
            fail: 'Fail'
          },
          form: {
            jobName: 'Please select job name'
          }
        },
        file: {
          userId: 'User ID',
          userName: 'User Name',
          fileUrl: 'File URL',
          fileSize: 'File Size',
          status: 'Operation Status',
          form: {
            userId: 'Please enter user id',
            userName: 'Please enter user name',
            fileUrl: 'Please enter file url',
            fileSize: 'Please enter file size',
            status: 'Please select operation status'
          }
        }
      }
    },
    tools: {
      common: {
        renderType: {
          input: 'Input',
          select: 'Select',
          radio: 'Radio'
        },
        searchType: {
          equal: 'Equal',
          noEqual: 'Not Equal',
          like: 'Like',
          leftLike: 'Left Like',
          rightLike: 'Right Like',
          greaterThan: 'Greater Than',
          greaterThanOrEqual: 'Greater Than Or Equal',
          lessThan: 'Less Than',
          lessThanOrEqual: 'Less Than Or Equal',
          in: 'In',
          notIn: 'Not In',
          between: 'Between',
          notBetween: 'Not Between'
        }
      }
    },
    game: {
      community: {
        communityName: 'Community Name',
        logo: 'Community Logo',
        website: 'Community Website',
        addCommunity: 'Community Add',
        editCommunity: 'Community Edit',
        bind: 'Community Bind',
        form: {
          communityName: 'Please enter community name',
          logo: 'Please upload community logo',
          website: 'Please enter community website',
          bind: 'Please enter community bind'
        }
      },
      game: {
        gameName: 'Game Name',
        addGame: 'Game Add',
        editGame: 'Game Edit',
        form: {
          gameName: 'Game Name'
        }
      },
      mode: {
        modeName: 'Mode Name',
        addMode: 'Mode Add',
        editMode: 'Mode Edit',
        form: {
          modeName: 'Mode Name'
        }
      },
      server: {
        serverName: 'Server Name',
        communityId: 'Community Id',
        modeId: 'Mode Id',
        gameId: 'Game Id',
        ip: 'Ip',
        port: 'Port',
        addServer: 'Server Add',
        editServer: 'Server Edit',
        players: 'Players',
        addr: 'Addr',
        form: {
          serverName: 'Please enter server name',
          communityId: 'Please select community id',
          modeId: 'Please select mode id',
          gameId: 'Please select game id',
          ip: 'Please enter ip',
          port: 'Please enter port'
        },
        version: 'Version'
      },
      map: {
        mapName: 'Map Name',
        mapLabel: 'Map Label',
        mapUrl: 'Map Url',
        mapModeUrl: 'Map Mode',
        modeId: 'Mode Id',
        type: 'Type',
        tag: 'Tag',
        artifact: 'Artifact',
        addMap: 'Map Add',
        editMap: 'Map Edit',
        mapCd: 'Map Cd',
        mapAchievement: 'Map Achievement',
        form: {
          mapName: 'Please enter map name',
          mapLabel: 'Please enter map label',
          mapUrl: 'Please enter map url',
          mapModeUrl: 'Please enter map mode url',
          modeId: 'Please select mode id',
          type: 'Please select type',
          tag: 'Please select tag',
          artifact: 'Please input artifact',
          desc: 'Please input artifact desc'
        }
      },
      live: {
        uid: 'Uid',
        avatar: 'Avatar',
        bgUrl: 'Bg Url',
        addLive: 'Live Add',
        editLive: 'Live Edit',
        notLive: 'Not Live',
        enterLive: 'Enter Live',
        joinLive: 'Join Live',
        form: {
          uid: 'Please enter uid',
          avatar: 'Please enter avatar',
          bgUrl: 'Please enter bg url'
        }
      },
      model: {
        modelName: 'Model Name',
        modelType: 'Model Type',
        modelUrl: 'Model Url',
        modelModeUrl: 'Model Mode Url',
        modelModeMaterial: 'Model Mode Material',
        addModel: 'Add Model',
        editModel: 'Edit Model',
        form: {
          modelName: 'Please enter model name',
          modelType: 'Please enter model type',
          modelUrl: 'Please enter model url',
          modelModeUrl: 'Please enter model mode url'
        }
      },
      mapStrategy: {
        title: 'Title',
        mapId: 'Map Id',
        mapLabel: 'Map Label',
        videoUrl: 'Video Url',
        status: 'Status',
        createTime: 'Create Time',
        userName: 'User Name',
        form: {
          title: 'Please enter title',
          mapId: 'Please select map id',
          mapLabel: 'Please enter map label',
          videoUrl: 'Please enter video url',
          status: 'Please select status'
        }
      }
    },
    server: {
      csgo2: {
        title: 'Counter-Strike 2'
      }
    },
    tool: {
      bind: {
        key: 'Please select key',
        value: 'Please select value'
      },
      mapOrder: {
        add: 'Add Subscription',
        test: 'Test Notification',
        mapName: 'Map Name',
        mapPush: 'Map Push',
        form: {
          mapName: 'Please enter map name'
        }
      },
      mapDisplay: {
        mapName: 'Please enter map name'
      },
      obs: {
        fontSize: 'Font Size',
        fontColor: 'Font Color',
        fontShadow: 'Font Shadow',
        obsLink: 'OBS Link',
        fontAlign: 'Font Align',
        showMap: 'Show Map',
        customText: 'Custom Text',
        fontFamily: 'Font',
        fontShadowWidth: 'Font Shadow Width'
      }
    },
    feedback: {
      userName: 'User Name',
      content: 'Feedback Content',
      image: 'Map Urls',
      type: 'Feedback Type',
      status: 'Feedback Status',
      addFeedback: 'Feedback Add',
      editFeedback: 'Feedback Edit',
      form: {
        content: 'Please enter feedback content',
        image: 'Please enter map urls',
        type: 'Please select feedback type',
        status: 'Please select feedback status'
      }
    },
    userCenter: {
      userInfo: {
        edit: 'Edit User Info',
        userAvatar: 'Avatar',
        userName: 'User Name',
        password: 'Password',
        nickName: 'Nick Name',
        phone: 'Phone',
        email: 'Email',
        gender: 'Gender',
        communityPreference: 'Community Preference',
        modePreference: 'Mode Preference',
        personalInfo: 'Personal Info',
        changePassword: 'Change Password',
        gameConfig: 'Game Config',
        basicInfo: 'Basic Info',
        oldPassword: 'Old Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        restartUserName: 'Restart User Info',
        restartUserNameConfirm: 'Please enter confirm password',
        form: {
          userName: 'Please enter user name',
          userAvatar: 'Please enter avatar',
          password: 'Please enter password',
          communityPreferencePlaceholder: 'Please select community preference',
          modePreferencePlaceholder: 'Please select mode preference',
          oldPasswordPlaceholder: 'Please enter old password',
          newPasswordPlaceholder: 'Please enter new password',
          confirmPasswordPlaceholder: 'Please enter confirm password'
        }
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    avatar: {
      required: 'Please enter avatar',
      invalid: 'Avatar format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    },
    nickName: {
      required: 'Please enter nick name',
      invalid: 'Nick name format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
