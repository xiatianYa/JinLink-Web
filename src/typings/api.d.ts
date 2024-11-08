/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common delete params */
    type DeleteParams = {
      ids: string[];
    };

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
      id: string;
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
    /** dict list */
    type DictPageList = Common.PaginatingQueryRecord<Dict>;
    /**
     * dict type
     *
     * - "1": system dict
     * - "2": business dict
     */
    type DictType = '1' | '2';

    /** dict item edit model */
    type DictItemEdit = Pick<
      Api.SystemManage.DictItem,
      'value' | 'zhCn' | 'enUs' | 'type' | 'sort' | 'description' | 'status'
    >;

    /** dict search params */
    type DictSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Dict, 'name' | 'code'> & Api.Common.CommonSearchParams
    >;

    /** dict edit model */
    type DictEdit = Pick<Api.SystemManage.Dict, 'name' | 'code' | 'type' | 'sort' | 'description' | 'status'>;

    /** dict tree * */
    type DictTree = Pick<Api.SystemManage.Dict, 'id' | 'name' | 'code' | 'type' | 'description' | 'status'>;

    /** dict item search params */
    type DictItemSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.DictItem, 'dictId' | 'value' | 'zhCn' | 'enUs' | 'description'> &
        Api.Common.CommonSearchParams
    >;

    /** dict item page list */
    type DictItemPageList = Common.PaginatingQueryRecord<DictItem>;

    /** dict options */
    type DictOptions = {
      label: string;
      value: string;
      type: NaiveUI.ThemeColor;
    };

    /** dict store search params */
    type DictStoreSearchParams = CommonType.RecordNullable<{ language: string; code?: string }>;

    /** CommonSearchParams */
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

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

    /** dict item */
    type DictItem = Common.CommonRecord<{
      /** dict id */
      dictId: string;
      /** dict code */
      dictCode: string;
      /** dict item value */
      value: string;
      /** dict item label: zh_cn */
      zhCn: string;
      /** dict item label: en_us */
      enUs: string;
      /** dict item type */
      type: string;
      /** dict item sort */
      sort: number;
      /** dict item description */
      description: string;
      /** dict item status */
      status: Common.EnableStatus;
    }>;

    /** dict */
    type Dict = Common.CommonRecord<{
      /** dict name */
      name: string;
      /** dict code */
      code: string;
      /** dict type */
      type: DictType;
      /** dict sort */
      sort: number;
      /** dict description */
      description: string;
      /** dict status */
      status: Common.EnableStatus;
    }>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
    }>;

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

  namespace Monitor {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** scheduler search params */
    type SchedulerSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Monitor.Scheduler,
        'jobName' | 'jobGroup' | 'triggerName' | 'triggerGroup' | 'cron' | 'jobClassName' | 'status'
      > &
        CommonSearchParams
    >;

    /** scheduler list */
    type SchedulerList = Common.PaginatingQueryRecord<Scheduler>;

    /** error log list */
    type ErrorLogList = Common.PaginatingQueryRecord<ErrorLog>;

    /** error log list */
    type FileLogList = Common.PaginatingQueryRecord<FileLog>;

    /** error log search params */
    type ErrorLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.ErrorLog, 'createUser'> & Api.Common.CommonSearchParams
    >;

    /** operation log list */
    type OperationLogList = Common.PaginatingQueryRecord<OperationLog>;

    /** login log search params */
    type OperationLogSearchParams = CommonType.RecordNullable<Api.Monitor.OperationLog & Api.Common.CommonSearchParams>;

    /** scheduler execute status */
    type SchedulerExecuteStatus = 'SUCCESS' | 'FAIL';

    /** scheduler log list */
    type SchedulerLogList = Common.PaginatingQueryRecord<SchedulerLog>;

    /** scheduler log search params */
    type SchedulerLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.SchedulerLog, 'jobName'> & Api.Common.CommonSearchParams
    >;
    /** login status */
    type LogsLoginStatus = '0' | '1';

    /** login status */
    type LogsFileStatus = '0' | '1';

    /** login log list */
    type LoginLogList = Common.PaginatingQueryRecord<LoginLog>;

    /** login log search params */
    type LoginLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.LoginLog, 'userName' | 'userRealName'> & Api.Common.CommonSearchParams
    >;

    /** login log search params */
    type FileLogSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.FileLog, 'userName'> & Api.Common.CommonSearchParams
    >;

    /** error log */
    type ErrorLog = Common.CommonRecord<
      {
        /** exception message */
        exceptionMessage: string;
        /** exception class */
        exceptionClass: string;
        /** line */
        line: number;
        /** stackTrace */
        stackTrace: string;
      } & OperationLog
    >;

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

    /** OperationLog */
    type OperationLog = Common.CommonRecord<{
      /** request id */
      requestId: number;
      /** ip */
      ip: string;
      /** ip addr */
      ipAddr: string;
      /** iser agent */
      userAgent: string;
      /** request uri */
      requestUri: string;
      /** request method */
      requestMethod: string;
      /** content Type */
      contentType: string;
      /** operation message */
      operation: string;
      /** method name */
      methodName: string;
      /** method params */
      methodParams: string;
      /** use time */
      useTime: number;
      /** createUser */
      createUser: string;
    }>;

    /** scheduler log */
    type SchedulerLog = Common.CommonRecord<{
      jobName: string;
      jobGroup: string;
      useTime: number;
      createTime: string;
      exceptionMessage: string;
      exceptionClass: string;
      line: number;
      stackTrace: string;
    }>;

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

    /** FileLog */
    type FileLog = Common.CommonRecord<{
      /** user id */
      userId: number;
      /** user name */
      userName: string;
      /** file url */
      fileUrl: string;
      /** file size */
      fileSize: string;
      /** login status */
      status: LogsFileStatus;
    }>;

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
