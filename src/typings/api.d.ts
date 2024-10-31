/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /** common search params of table */
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** user gender */
      userGender: UserGender | null;
      /** user nick name */
      nickName: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** user role code collection */
      userRoles: string[];
    }>;

    /** userVo */
    type UserVo = {
      /** user name */
      userName: string;
      /** user gender */
      userGender: UserGender | null;
      /** user nick name */
      nickName: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** status */
      status: Api.Common.EnableStatus | null;
      /** user role code collection */
      userRoles: string[];
    };

    /** roleVo */
    type RoleVo = {
      /** user name */
      roleName: string;
      /** user gender */
      roleCode: string;
      /** user nick name */
      roleDesc: string;
      /** status */
      status: Api.Common.EnableStatus | null;
    };

    /** menuVo */
    type MenuVo = {
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    };

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'status'> &
        CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
  }

  namespace MonitorManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** scheduler */
    type Scheduler = Common.CommonRecord<{
      /** 任务名称 */
      jobName: string;
      /** 任务组别 */
      jobGroup: string;
      /** 触发器名称 */
      triggerName: string;
      /** 触发器组别 */
      triggerGroup: string;
      /** 调度表达式 */
      cron: string;
      /** 调度任务全类名 */
      jobClassName: string;
      /** 调度任务状态 */
      status: any;
    }>;

    /** scheduler search params */
    type SchedulerSearchParams = CommonType.RecordNullable<
      Pick<
        Api.MonitorManage.Scheduler,
        'jobName' | 'jobGroup' | 'triggerName' | 'triggerGroup' | 'cron' | 'jobClassName' | 'status'
      > &
        CommonSearchParams
    >;

    /** scheduler list */
    type SchedulerList = Common.PaginatingQueryRecord<Scheduler>;
  }

  namespace Monitor {
    /**
     * login status
     *
     * - "0": "fail"
     * - "1": "success"
     */
    type LogsLoginStatus = '0' | '1';

    /** LoginLog */
    type LoginLog = Common.CommonRecord<{
      /** user id */
      userId: number;
      /** user name */
      userName: string;
      /** user real name */
      userRealName: string;
      /** login ip */
      ip: string;
      /** login address */
      ipAddr: string;
      /** user agent */
      userAgent: string;
      /** login status */
      status: LogsLoginStatus;
      /** login message */
      message: string;
    }>;

    /** login log list */
    type LoginLogList = Common.PaginatingQueryRecord<LoginLog>;

    /** login log search params */
    type LoginLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.LoginLog, 'userName' | 'userRealName'> & Api.Common.CommonSearchParams
    >;

    /** Cache Redis */
    type RedisInfo = {
      /** Redis version */
      version: string;
      /** upTime */
      uptime: string;
      /** connectedClients */
      connectedClients: number;
      /** usedMemory */
      usedMemory: string;
      /** usedMemoryPeak */
      maxMemory: string;
      /** memoryUsageRate */
      memoryUsageRate: string;
      /** menFragmentationRatio */
      memFragmentationRatio: string;
      /** totalCommandsProcessed */
      totalCommandsProcessed: number;
      /** Command Stats */
      commandStats: {
        name: string;
        value: number;
        percentage: number;
      }[];
    };

    /** SystemInfo */
    type SystemInfo = {
      /** Operating system information */
      operatingSystem: OperatingSystem;
      /** Central processor information */
      centralProcessor: CentralProcessor;
      /** Global memory information */
      globalMemory: GlobalMemory;
      /** JVM information */
      jvm: JVM;
      /** File stores */
      fileStores: FileStore[];
      /** Processes */
      processes: Process[];
    };

    /** Operating system information */
    type OperatingSystem = {
      /** name */
      name: string;
      /** arch */
      arch: string;
      /** System boot time */
      systemBootTime: string;
      /** System uptime */
      systemUptime: string;
      /** Operating system manufacturer */
      manufacturer: string;
    };

    /** Central processor information */
    type CentralProcessor = {
      /** Processor name */
      name: string;
      /** Processor identifier */
      identifier: string;
      /** Vendor frequency */
      vendorFreq: string;
      /** Number of physical processors */
      physicalProcessorCount: number;
      /** Number of logical processors */
      logicalProcessorCount: number;
      /** System load average */
      systemLoadAverage: number;
      /** Processor usage rate */
      userPercent: number;
      /** System usage rate */
      systemPercent: number;
      /** Idle rate */
      idlePercent: number;
    };

    /** Global memory information */
    type GlobalMemory = {
      /** Total memory */
      total: string;
      /** Used memory */
      used: string;
      /** Available memory */
      available: string;
      /** Total swap memory */
      swapTotal: string;
      /** Used swap memory */
      swapUsed: string;
      /** Free swap memory */
      swapFree: string;
      /** Memory usage rate */
      memoryUsedRate: number;
      /** Swap usage rate */
      swapUsedRate: number;
    };

    /** JVM information */
    type JVM = {
      /** JVM name */
      vmName: string;
      /** JVM uptime */
      uptime: string;
      /** JVM version */
      vmVersion: string;
      /** JVM vendor */
      vmVendor: string;
      /** JVM start time */
      startTime: string;
      /** JVM input arguments */
      inputArguments: string;
      /** Heap memory used */
      heapMemoryUsed: string;
      /** Maximum heap memory */
      heapMemoryMax: string;
      /** Heap memory usage rate */
      memoryUsageRate: number;
      /** Non-heap memory used */
      nonHeapMemoryUsed: string;
    };

    /** File store information */
    type FileStore = {
      /** File store name */
      name: string;
      /** File store type */
      type: string;
      /** Mount */
      mount: string;
      /** Total space */
      totalSpace: string;
      /** Usable space */
      usableSpace: string;
      /** Used space */
      usedSpace: string;
      /** Usage rate */
      usedPercentage: string;
    };

    /** Process information */
    type Process = {
      /** Process ID */
      processID: number;
      /** Process name */
      name: string;
      /** CPU load */
      cpuLoad: string;
    };
  }
}
