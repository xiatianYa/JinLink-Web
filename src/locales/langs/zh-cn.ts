const local: App.I18n.Schema = {
  system: {
    title: 'Soybean 管理系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    action: '操作',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    batchDeleteAll: '清空列表',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    warning: '警告',
    error: '错误',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    userCenter: '个人中心',
    yesOrNo: {
      yes: '是',
      no: '否'
    }
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式',
      auto: '跟随系统'
    },
    grayscale: '灰色模式',
    colourWeakness: '色弱模式',
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式',
      reverseHorizontalMix: '一级菜单与子级菜单位置反转'
    },
    recommendColor: '应用推荐算法的颜色',
    recommendColorDesc: '推荐颜色的算法参照',
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '缓存标签页',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    watermark: {
      visible: '显示全屏水印',
      text: '水印文本'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    about: '关于',
    manage: '系统管理',
    manage_user: '用户管理',
    'manage_user-detail': '用户详情',
    manage_role: '角色管理',
    manage_menu: '菜单管理',
    'user-center': '个人中心',
    monitor: '监控管理',
    monitor_scheduler: '调度任务',
    monitor_system: '系统监控',
    monitor_cache: '缓存监控',
    monitor_logs: '日志管理',
    monitor_logs_login: '登录日志',
    manage_dict: '字典管理',
    monitor_logs_scheduler: '调度日志',
    monitor_logs_error: '异常日志',
    monitor_logs_operation: '操作日志',
    monitor_logs_file: '文件日志',
    game: '游戏管理',
    game_community: '游戏社区管理',
    game_game: '游戏类型管理',
    game_mode: '游戏模式管理'
  },
  page: {
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        userNamePlaceholder: '请输入用户名',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{userName} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        superAdmin: '超级管理员',
        admin: '管理员',
        user: '普通用户'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    about: {
      title: '关于',
      introduction: `SoybeanAdmin 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite5, TypeScript, Pinia 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 ApiFox 的在线Mock数据方案。SoybeanAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。`,
      projectInfo: {
        title: '项目信息',
        version: '版本',
        latestBuildTime: '最新构建时间',
        githubLink: 'Github 地址',
        previewLink: '预览地址'
      },
      prdDep: '生产依赖',
      devDep: '开发依赖'
    },
    home: {
      branchDesc:
        '为了方便大家开发和更新合并，我们对main分支的代码进行了精简，只保留了首页菜单，其余内容已移至example分支进行维护。预览地址显示的内容即为example分支的内容。',
      greeting: '早安，{userName}, 今天又是充满活力的一天!',
      weatherDesc: '今日多云转晴，20℃ - 25℃!',
      projectCount: '项目数',
      todo: '待办',
      message: '消息',
      downloadCount: '下载量',
      registerCount: '注册量',
      schedule: '作息安排',
      study: '学习',
      work: '工作',
      rest: '休息',
      entertainment: '娱乐',
      visitCount: '访问量',
      turnover: '成交额',
      dealCount: '成交量',
      projectNews: {
        title: '项目动态',
        moreNews: '更多动态',
        desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
        desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
        desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
        desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
        desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！'
      },
      creativity: '创意'
    },
    manage: {
      common: {
        status: {
          enable: '启用',
          disable: '禁用'
        }
      },
      role: {
        title: '角色列表',
        roleName: '角色名称',
        roleCode: '角色编码',
        roleStatus: '角色状态',
        roleDesc: '角色描述',
        menuAuth: '菜单权限',
        buttonAuth: '按钮权限',
        form: {
          roleName: '请输入角色名称',
          roleCode: '请输入角色编码',
          roleStatus: '请选择角色状态',
          roleDesc: '请输入角色描述'
        },
        addRole: '新增角色',
        editRole: '编辑角色'
      },
      user: {
        title: '用户列表',
        userName: '用户名',
        userGender: '性别',
        nickName: '昵称',
        userPhone: '手机号',
        userEmail: '邮箱',
        userStatus: '用户状态',
        userRole: '用户角色',
        form: {
          userName: '请输入用户名',
          userGender: '请选择性别',
          nickName: '请输入昵称',
          userPhone: '请输入手机号',
          userEmail: '请输入邮箱',
          userStatus: '请选择用户状态',
          userRole: '请选择用户角色'
        },
        addUser: '新增用户',
        editUser: '编辑用户',
        gender: {
          male: '男',
          female: '女'
        }
      },
      menu: {
        home: '首页',
        title: '菜单列表',
        id: 'ID',
        parentId: '父级菜单ID',
        menuType: '菜单类型',
        menuName: '菜单名称',
        routeName: '路由名称',
        routePath: '路由路径',
        pathParam: '路径参数',
        layout: '布局',
        page: '页面组件',
        i18nKey: '国际化key',
        icon: '图标',
        localIcon: '本地图标',
        iconTypeTitle: '图标类型',
        order: '排序',
        constant: '常量路由',
        keepAlive: '缓存路由',
        href: '外链',
        hideInMenu: '隐藏菜单',
        activeMenu: '高亮的菜单',
        multiTab: '支持多页签',
        fixedIndexInTab: '固定在页签中的序号',
        query: '路由参数',
        button: '按钮',
        buttonCode: '按钮编码',
        buttonDesc: '按钮描述',
        menuStatus: '菜单状态',
        form: {
          home: '请选择首页',
          menuType: '请选择菜单类型',
          menuName: '请输入菜单名称',
          routeName: '请输入路由名称',
          routePath: '请输入路由路径',
          pathParam: '请输入路径参数',
          page: '请选择页面组件',
          layout: '请选择布局组件',
          i18nKey: '请输入国际化key',
          icon: '请输入图标',
          localIcon: '请选择本地图标',
          order: '请输入排序',
          keepAlive: '请选择是否缓存路由',
          href: '请输入外链',
          hideInMenu: '请选择是否隐藏菜单',
          activeMenu: '请选择高亮的菜单的路由名称',
          multiTab: '请选择是否支持多标签',
          fixedInTab: '请选择是否固定在页签中',
          fixedIndexInTab: '请输入固定在页签中的序号',
          queryKey: '请输入路由参数Key',
          queryValue: '请输入路由参数Value',
          button: '请选择是否按钮',
          buttonCode: '请输入按钮编码',
          buttonDesc: '请输入按钮描述',
          menuStatus: '请选择菜单状态'
        },
        addMenu: '新增菜单',
        editMenu: '编辑菜单',
        addChildMenu: '新增子菜单',
        type: {
          directory: '目录',
          menu: '菜单'
        },
        iconType: {
          iconify: 'iconify图标',
          local: '本地图标'
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
            createUser: '请选择操作用户'
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
          fileUrl: '文件路径',
          fileSize: '文件大小',
          status: '操作状态',
          form: {
            userId: '请输入用户ID',
            userName: '请输入用户名称',
            fileUrl: '请输入文件路径',
            fileSize: '请输入文件大小',
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
        communityName: '社区名称',
        addCommunity: '添加社区',
        editCommunity: '编辑社区',
        form: {
          communityName: '请输入社区名称'
        }
      },
      game: {
        gameName: '游戏名称',
        addGame: '添加游戏名称',
        editGame: '编辑游戏名称',
        form: {
          gameName: '请输入游戏名称'
        }
      },
      mode: {
        modeName: '模式名称',
        addMode: '添加模式名称',
        editMode: '编辑模式名称',
        form: {
          modeName: '请输入模式名称'
        }
      }
    }
  },
  form: {
    required: '不能为空',
    userName: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  }
};

export default local;
