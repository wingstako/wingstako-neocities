-- it is for MSSQL
SELECT r.session_id                                        AS SPID,
       s.host_name,
       s.login_name,
       command,
       r.last_wait_type,
       r.deadlock_priority,
       r.blocking_session_id,
       s.lock_timeout,
       r.start_time,
       CONVERT(TIME, Dateadd(ms, r.wait_time, 0))          wait_minutes,
       CONVERT(TIME, Dateadd(ms, r.total_elapsed_time, 0)) elapse_time,
       percent_complete,
       Dateadd(ms, estimated_completion_time, Getdate())   AS
       estimated_completion_time,
       r.status,
       r.wait_resource,
       Db_name(a.dbid)                                     dbName,
       Object_name(a.objectid, a.dbid)                     objectName,
       s.program_name,
       Substring(a.text, r.statement_start_offset / 2 + 1,
       ( CASE
           WHEN r.statement_end_offset <= 0 THEN Len(a.text)
           ELSE r.statement_end_offset
         END - r.statement_start_offset ) / 2 + 1)         runningStatement
FROM   sys.dm_exec_requests r
       CROSS apply sys.Dm_exec_sql_text(r.sql_handle) a
       INNER JOIN sys.dm_exec_sessions s
               ON r.session_id = s.session_id
WHERE  r.session_id <> @@SPID;