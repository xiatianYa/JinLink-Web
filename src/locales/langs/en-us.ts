const local: App.I18n.Schema = {
  system: {
    title: 'SoybeanAdmin',
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
    batchDeleteAll: '清空列表',
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
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    }
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
    server_projectzombie: 'Project Zombie'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        userNamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !'
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
        desc1: 'Summer rebuilt the blue archive login server on November 18, 2024!'
      },
      onlineUser: 'Online User'
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
        title: '字典列表',
        name: '字典名称',
        code: '字典编码',
        type: '字典类型',
        description: '字典描述',
        sort: '排序',
        status: '字典状态',
        form: {
          name: '请输入字典名称',
          code: '请输入字典编码',
          type: '请选择字典类型',
          description: '请输入字典描述',
          sort: '请输入排序',
          status: '请选择字典状态'
        },
        addDict: '新增字典',
        editDict: '编辑字典',
        dictType: {
          system: '系统字典',
          business: '业务字典'
        },
        loadCacheSuccess: '缓存成功',
        selectTreeIsEmptyTip: '请选择字典查看子项目',
        systemFieldsCannotBeDeleted: '系统字段禁止操作删除'
      },
      dictItem: {
        title: '字典项列表',
        dictCode: '字典编码',
        value: '字典值',
        zhCN: '中文',
        enUS: '英文',
        color: '#颜色',
        sort: '排序',
        type: '类型',
        status: '状态',
        description: '描述',
        form: {
          value: '请输入字典值',
          zhCN: '请输入字典项中文',
          enUS: '请输入字典项英文',
          color: '请选择颜色',
          type: '请选择类型',
          sort: '请输入排序',
          status: '请选择字典项状态',
          description: '请输入字典描述'
        },
        addDictItem: '新增字典项',
        editDictItem: '编辑字典项'
      }
    },
    monitor: {
      percentage: '{value} %',
      scheduler: {
        title: '任务列表',
        jobName: '任务名称',
        jobGroup: '任务组别',
        triggerName: '触发器名称',
        triggerGroup: '触发器组别',
        jobData: '任务参数',
        triggerData: '触发器参数',
        addScheduler: '添加调度任务',
        editScheduler: '编辑调度任务',
        corn: '调度表达式',
        jobClassName: '调度任务全类名',
        status: '状态',
        form: {
          jobName: '请输入任务名称',
          jobGroup: '请输入任务组别',
          triggerName: '请输入触发器名称',
          triggerGroup: '请输入触发器组别',
          jobData: '请输入任务参数',
          triggerData: '请输入触发器参数',
          corn: '请输入调度表达式',
          jobClassName: '请输入调度任务全类名',
          status: '状态'
        }
      },
      system: {
        status: '系统状态',
        cpuUserUsage: 'CPU 用户使用率',
        cpuSystemUsage: 'CPU 系统使用率',
        systemMemoryUsage: '系统内存使用率',
        jvmMemoryUsage: 'JVM 内存使用率',
        operatingSystem: {
          title: '系统信息',
          name: '操作系统',
          manufacturer: '系统制造商',
          arch: '系统架构',
          systemBootTime: '系统启动时间',
          systemUptime: '系统运行时间'
        },
        centralProcessor: {
          title: '中央处理器',
          name: 'CPU 名称',
          physicalProcessorCount: '物理核心数',
          logicalProcessorCount: '逻辑核心数（包含超线程）',
          processorIdentifier: '处理器标识符',
          vendorFreq: 'CPU 频率',
          userPercent: '用户使用率',
          systemPercent: '系统使用率',
          idlePercent: '空闲率'
        },
        globalMemory: {
          title: '系统内存',
          total: '总内存',
          used: '已用内存',
          available: '可用内存',
          swapTotal: '交换区总内存',
          swapUsed: '已用交换区',
          swapFree: '剩余交换区',
          memoryUsedRate: '内存使用率',
          swapUsedRate: '交换区使用率'
        },
        jvm: {
          title: 'JVM 内存',
          vmName: '名称',
          uptime: '运行时间',
          vmVersion: '版本',
          vmVendor: '供应商',
          startTime: '启动时间',
          inputArguments: '输入参数',
          heapMemoryUsed: '堆内存已用',
          heapMemoryMax: '堆内存最大',
          memoryUsageRate: '使用率',
          nonHeapMemoryUsed: '非堆内存已用'
        },
        fileStore: {
          title: '文件存储',
          name: '名称',
          type: '类型',
          mount: '挂载点',
          totalSpace: '总空间',
          usableSpace: '可用空间',
          usedSpace: '已用空间',
          usedPercentage: '已用百分比'
        },
        process: {
          title: '系统前 6 进程',
          processID: '进程ID',
          name: '名称',
          cpuLoad: 'CPU 负载'
        }
      },
      cache: {
        redis: {
          title: 'Redis 缓存信息',
          version: '版本',
          uptime: '运行时间',
          connectedClients: '连接客户端数',
          usedMemory: '已用内存',
          maxMemory: '最大内存',
          memoryUsageRate: '内存使用率',
          memFragmentationRatio: '内存碎片率',
          totalCommandsProcessed: '命令处理总数',
          echartsTitle: '命令统计',
          echartsSubTitle: '图示每一个命令的执行占比'
        }
      },
      logs: {
        login: {
          userName: '用户名',
          userRealName: '真实姓名',
          ip: '登录 IP',
          ipAddr: 'IP 所属地',
          userAgent: 'User-Agent',
          status: '登录状态',
          message: '登录信息',
          createTime: '登录时间',
          createUser: '登录用户',
          form: {
            userName: '请填写用户名',
            userRealName: '请填写真实姓名'
          },
          loginStatus: {
            fail: '登录失败',
            success: '登录成功'
          }
        },
        operation: {
          requestId: '请求 ID',
          ip: '操作 IP',
          ipAddr: 'IP 所属地',
          userAgent: 'User-Agent',
          requestUri: '请求 URI',
          requestMethod: '请求方式',
          contentType: '请求类型',
          methodName: '操作方法',
          operation: '操作方法说明',
          methodParams: '操作参数',
          useTime: '耗时(ms)',
          createUser: '操作用户',
          createTime: '操作时间',
          form: {
            createUser: '请填写操作用户'
          }
        },
        error: {
          requestId: '请求 ID',
          ip: '操作 IP',
          ipAddr: 'IP 所属地',
          userAgent: 'User-Agent',
          requestUri: '请求 URI',
          requestMethod: '请求方式',
          contentType: '请求类型',
          methodName: '操作方法',
          operation: '操作方法说明',
          methodParams: '操作参数',
          useTime: '耗时(ms)',
          createUser: '操作用户',
          createTime: '异常时间',
          exceptionMessage: '异常信息',
          exceptionClass: '异常类名',
          line: '异常行号',
          stackTrace: '异常堆栈',
          form: {
            createUser: '请填写操作用户'
          }
        },
        scheduler: {
          jobName: '任务名称',
          jobGroup: '任务组名',
          useTime: '耗时(ms)',
          status: '执行状态',
          createTime: '执行时间',
          exceptionMessage: '异常信息',
          exceptionClass: '异常类名',
          line: '异常行号',
          stackTrace: '异常堆栈',
          executeStatus: {
            success: '执行成功',
            fail: '执行失败'
          },
          form: {
            jobName: '请选择任务名称'
          }
        },
        file: {
          userId: '用户ID',
          userName: '用户名称',
          fileUrl: '用户名称',
          fileSize: '用户名称',
          status: '操作状态',
          form: {
            userId: '请输入用户ID',
            userName: '请输入用户名称',
            fileUrl: '请输入用户名称',
            fileSize: '请输入用户名称',
            status: '请选择操作状态'
          }
        }
      }
    },
    tools: {
      common: {
        renderType: {
          input: '输入框',
          select: '下拉框',
          radio: '单选框'
        },
        searchType: {
          equal: '等于',
          noEqual: '不等于',
          like: '模糊',
          leftLike: '左模糊',
          rightLike: '右模糊',
          greaterThan: '大于',
          greaterThanOrEqual: '大于等于',
          lessThan: '小于',
          lessThanOrEqual: '小于等于',
          in: '包含',
          notIn: '不包含',
          between: '在区间内',
          notBetween: '不在区间内'
        }
      },
      generateTable: {
        tableName: '表名',
        tableComment: '表注释',
        tablePrefix: '表前缀',
        parentPackage: '生成父包名',
        moduleName: '模块名',
        parentMenuName: '上级菜单',
        author: '作者',
        status: '状态',
        form: {
          tableName: '请输入表名',
          tableNameSelect: '请选择表名',
          tableComment: '请输入表注释',
          tablePrefix: '请输入表前缀',
          parentPackage: '请输入生成父包名',
          moduleName: '请输入模块名',
          parentMenuName: '请选择上级菜单',
          author: '请输入作者'
        },
        addGenerate: '新增生成',
        editGenerate: '编辑生成表：{tableName}',
        isNotDevEnvTip: '当前为非开发环境，不允许新增编辑数据'
      },
      generateTableColumn: {
        ordinalPosition: '表序号',
        columnName: '字段名称',
        propertyName: '属性名称',
        columnComment: '字段注释',
        dataType: '数据类型',
        javaType: 'Java类型',
        typescriptType: 'TypeScript类型',
        list: '列表',
        search: '查询',
        searchType: '查询条件',
        required: '必填',
        added: '新增',
        edit: '编辑',
        renderType: '渲染类型',
        dictCode: '数据字典',
        status: '启用状态',
        cleanColumns: '清空字段',
        cleanColumnsConfirm: '你确定要清空生成表字段？它会删除现有配置字段，可二次同步数据库字段即可。',
        cleanSuccess: '清空成功',
        syncColumns: '同步数据库字段',
        syncColumnsConfirm: '你确定要同步数据库字段？',
        syncSuccess: '同步成功',
        baseInfo: '基础信息',
        columnInfo: '字段信息',
        resultInfo: '结果信息',
        generateSuccess: '生成成功',
        downloadZip: '下载 ZIP 压缩包',
        previous: '上一步',
        next: '下一步'
      }
    },
    game: {
      community: {
        communityName: 'Community Name',
        logo: 'Community Logo',
        website: 'Community Website',
        addCommunity: 'Community Add',
        editCommunity: 'Community Edit',
        form: {
          communityName: 'Please enter community name',
          logo: 'Please upload community logo',
          website: 'Please enter community website'
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
        }
      },
      map: {
        mapName: 'Map Name',
        mapLabel: 'Map Label',
        mapUrl: 'Map Url',
        modeId: 'Mode Id',
        type: 'Type',
        tag: 'Tag',
        artifact: 'Artifact',
        addMap: 'Map Add',
        editMap: 'Map Edit',
        mapCd: 'Map Cd',
        form: {
          mapName: 'Please enter map name',
          mapLabel: 'Please enter map label',
          mapUrl: 'Please enter map url',
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
        form: {
          uid: 'Please enter uid',
          avatar: 'Please enter avatar',
          bgUrl: 'Please enter bg url'
        }
      }
    },
    server: {
      csgo2: {
        title: 'Counter-Strike 2'
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
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
