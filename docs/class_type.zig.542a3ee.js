var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const genericEql = @import(\"../generic_eql.zig\").eql;"},
{"lineNum":"   20","line":"const Type = @import(\"type.zig\").Type;"},
{"lineNum":"   21","line":"const Visibility = @import(\"../visibility.zig\").Visibility;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const ClassType = struct {"},
{"lineNum":"   24","line":"    pub const Member = struct {"},
{"lineNum":"   25","line":"        // TODO: static and initialization values"},
{"lineNum":"   26","line":"        name: []const u8,"},
{"lineNum":"   27","line":"        ty: Type.Ptr,"},
{"lineNum":"   28","line":"        visibility: Visibility,"},
{"lineNum":"   29","line":"        isReadOnly: bool,"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"        pub fn eql(a: Member, b: Member) bool {","class":"lineCov","hits":"1","order":"1493","possible_hits":"1",},
{"lineNum":"   32","line":"            return genericEql(a, b);","class":"lineCov","hits":"1","order":"1494","possible_hits":"1",},
{"lineNum":"   33","line":"        }"},
{"lineNum":"   34","line":"    };"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    super: ?Type.Ptr,"},
{"lineNum":"   37","line":"    name: []const u8,"},
{"lineNum":"   38","line":"    members: []Member,"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn new(","class":"lineCov","hits":"1","order":"1394","possible_hits":"1",},
{"lineNum":"   41","line":"        super: ?Type.Ptr,"},
{"lineNum":"   42","line":"        name: []const u8,"},
{"lineNum":"   43","line":"        members: []Member,"},
{"lineNum":"   44","line":"    ) ClassType {"},
{"lineNum":"   45","line":"        std.debug.assert(super == null or super.?.getType() == .Class);","class":"linePartCov","hits":"1","order":"1395","possible_hits":"2",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"        return ClassType{","class":"lineCov","hits":"1","order":"1399","possible_hits":"1",},
{"lineNum":"   48","line":"            .super = super,","class":"lineCov","hits":"1","order":"1396","possible_hits":"1",},
{"lineNum":"   49","line":"            .name = name,","class":"lineCov","hits":"1","order":"1397","possible_hits":"1",},
{"lineNum":"   50","line":"            .members = members,","class":"lineCov","hits":"1","order":"1398","possible_hits":"1",},
{"lineNum":"   51","line":"        };"},
{"lineNum":"   52","line":"    }"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    pub fn hash(self: ClassType) usize {","class":"lineCov","hits":"1","order":"1554","possible_hits":"1",},
{"lineNum":"   55","line":"        var result: usize = if (self.super) |super|","class":"lineCov","hits":"2","order":"1555","possible_hits":"2",},
{"lineNum":"   56","line":"            super.hash()","class":"lineCov","hits":"1","order":"1565","possible_hits":"1",},
{"lineNum":"   57","line":"        else"},
{"lineNum":"   58","line":"            0x0e28e786568bc7a6;","class":"lineCov","hits":"1","order":"1556","possible_hits":"1",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"        result ^= std.hash.Wyhash.hash(0, self.name);","class":"lineCov","hits":"1","order":"1557","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        for (self.members) |mem| {","class":"lineCov","hits":"2","order":"1558","possible_hits":"2",},
{"lineNum":"   63","line":"            result ^= std.hash.Wyhash.hash(0, mem.name);","class":"lineCov","hits":"1","order":"1559","possible_hits":"1",},
{"lineNum":"   64","line":"            result ^= @ptrToInt(mem.ty);","class":"lineCov","hits":"1","order":"1560","possible_hits":"1",},
{"lineNum":"   65","line":"            result += @enumToInt(mem.visibility);","class":"linePartCov","hits":"1","order":"1561","possible_hits":"2",},
{"lineNum":"   66","line":"        }"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"        return result;","class":"lineCov","hits":"1","order":"1562","possible_hits":"1",},
{"lineNum":"   69","line":"    }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    pub fn write(self: ClassType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1405","possible_hits":"4",},
{"lineNum":"   72","line":"        try writer.print(\"class {s}\", .{self.name});","class":"linePartCov","hits":"1","order":"1406","possible_hits":"2",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    pub fn getNamedMember(","class":"lineCov","hits":"1","order":"1593","possible_hits":"1",},
{"lineNum":"   76","line":"        self: ClassType,"},
{"lineNum":"   77","line":"        name: []const u8,"},
{"lineNum":"   78","line":"    ) ?Member {"},
{"lineNum":"   79","line":"        for (self.members) |member|","class":"lineCov","hits":"2","order":"1594","possible_hits":"2",},
{"lineNum":"   80","line":"            if (std.mem.eql(u8, member.name, name))","class":"lineCov","hits":"2","order":"1595","possible_hits":"2",},
{"lineNum":"   81","line":"                return member;","class":"lineCov","hits":"1","order":"1596","possible_hits":"1",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"        if (self.super) |super|","class":"lineCov","hits":"2","order":"1601","possible_hits":"2",},
{"lineNum":"   84","line":"            return super.Class.getNamedMember(name);","class":"lineCov","hits":"2","order":"1602","possible_hits":"2",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"        return null;","class":"lineCov","hits":"1","order":"1607","possible_hits":"1",},
{"lineNum":"   87","line":"    }"},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    pub fn isSubclassOf(self: ClassType, super: Type.Ptr) bool {","class":"lineCov","hits":"1","order":"1619","possible_hits":"1",},
{"lineNum":"   90","line":"        if (super.getType() != .Class)","class":"lineCov","hits":"2","order":"1620","possible_hits":"2",},
{"lineNum":"   91","line":"            return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"        var s = self.super;","class":"lineCov","hits":"1","order":"1621","possible_hits":"1",},
{"lineNum":"   94","line":"        while (s) |ss| {","class":"lineCov","hits":"2","order":"1622","possible_hits":"2",},
{"lineNum":"   95","line":"            std.debug.assert(ss.getType() == .Class);","class":"lineCov","hits":"1","order":"1627","possible_hits":"1",},
{"lineNum":"   96","line":"            if (super == ss)","class":"lineCov","hits":"2","order":"1628","possible_hits":"2",},
{"lineNum":"   97","line":"                return true;","class":"lineCov","hits":"1","order":"1629","possible_hits":"1",},
{"lineNum":"   98","line":"            s = ss.Class.super;","class":"linePartCov","hits":"2","order":"1633","possible_hits":"3",},
{"lineNum":"   99","line":"        }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"        return false;","class":"lineCov","hits":"1","order":"1623","possible_hits":"1",},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":"};"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"test \"can check ClassType.Member equality\" {","class":"lineCov","hits":"2","order":"1469","possible_hits":"2",},
{"lineNum":"  106","line":"    const number = Type.newNumber();","class":"lineCov","hits":"1","order":"1470","possible_hits":"1",},
{"lineNum":"  107","line":"    const boolean = Type.newBoolean();","class":"lineCov","hits":"1","order":"1471","possible_hits":"1",},
{"lineNum":"  108","line":"    const a = ClassType.Member{"},
{"lineNum":"  109","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1473","possible_hits":"1",},
{"lineNum":"  110","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1472","possible_hits":"1",},
{"lineNum":"  111","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1474","possible_hits":"1",},
{"lineNum":"  112","line":"        .isReadOnly = false,","class":"lineCov","hits":"1","order":"1475","possible_hits":"1",},
{"lineNum":"  113","line":"    };"},
{"lineNum":"  114","line":"    const b = ClassType.Member{"},
{"lineNum":"  115","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1477","possible_hits":"1",},
{"lineNum":"  116","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1476","possible_hits":"1",},
{"lineNum":"  117","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1478","possible_hits":"1",},
{"lineNum":"  118","line":"        .isReadOnly = false,","class":"lineCov","hits":"1","order":"1479","possible_hits":"1",},
{"lineNum":"  119","line":"    };"},
{"lineNum":"  120","line":"    const c = ClassType.Member{"},
{"lineNum":"  121","line":"        .name = \"b\",","class":"lineCov","hits":"1","order":"1481","possible_hits":"1",},
{"lineNum":"  122","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1480","possible_hits":"1",},
{"lineNum":"  123","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1482","possible_hits":"1",},
{"lineNum":"  124","line":"        .isReadOnly = false,","class":"lineCov","hits":"1","order":"1483","possible_hits":"1",},
{"lineNum":"  125","line":"    };"},
{"lineNum":"  126","line":"    const d = ClassType.Member{"},
{"lineNum":"  127","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1485","possible_hits":"1",},
{"lineNum":"  128","line":"        .ty = &boolean,","class":"lineCov","hits":"1","order":"1484","possible_hits":"1",},
{"lineNum":"  129","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1486","possible_hits":"1",},
{"lineNum":"  130","line":"        .isReadOnly = false,","class":"lineCov","hits":"1","order":"1487","possible_hits":"1",},
{"lineNum":"  131","line":"    };"},
{"lineNum":"  132","line":"    const e = ClassType.Member{"},
{"lineNum":"  133","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1489","possible_hits":"1",},
{"lineNum":"  134","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1488","possible_hits":"1",},
{"lineNum":"  135","line":"        .visibility = .Protected,","class":"lineCov","hits":"1","order":"1490","possible_hits":"1",},
{"lineNum":"  136","line":"        .isReadOnly = false,","class":"lineCov","hits":"1","order":"1491","possible_hits":"1",},
{"lineNum":"  137","line":"    };"},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    try std.testing.expect(a.eql(a));","class":"lineCov","hits":"1","order":"1492","possible_hits":"1",},
{"lineNum":"  140","line":"    try std.testing.expect(a.eql(b));","class":"lineCov","hits":"1","order":"1495","possible_hits":"1",},
{"lineNum":"  141","line":"    try std.testing.expect(!a.eql(c));","class":"lineCov","hits":"1","order":"1496","possible_hits":"1",},
{"lineNum":"  142","line":"    try std.testing.expect(!a.eql(d));","class":"lineCov","hits":"1","order":"1497","possible_hits":"1",},
{"lineNum":"  143","line":"    try std.testing.expect(!a.eql(e));","class":"lineCov","hits":"1","order":"1498","possible_hits":"1",},
{"lineNum":"  144","line":"}"},
{"lineNum":"  145","line":""},
{"lineNum":"  146","line":"test \"can hash a ClassType\" {","class":"lineCov","hits":"2","order":"1499","possible_hits":"2",},
{"lineNum":"  147","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1500","possible_hits":"1",},
{"lineNum":"  148","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1501","possible_hits":"1",},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":"    const a = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1510","possible_hits":"1",},
{"lineNum":"  151","line":"        Type.ClassType.Member{"},
{"lineNum":"  152","line":"            .name = \"a\",","class":"lineCov","hits":"1","order":"1503","possible_hits":"1",},
{"lineNum":"  153","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1502","possible_hits":"1",},
{"lineNum":"  154","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1504","possible_hits":"1",},
{"lineNum":"  155","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1505","possible_hits":"1",},
{"lineNum":"  156","line":"        },"},
{"lineNum":"  157","line":"        Type.ClassType.Member{"},
{"lineNum":"  158","line":"            .name = \"b\",","class":"lineCov","hits":"1","order":"1507","possible_hits":"1",},
{"lineNum":"  159","line":"            .ty = &str,","class":"lineCov","hits":"1","order":"1506","possible_hits":"1",},
{"lineNum":"  160","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1508","possible_hits":"1",},
{"lineNum":"  161","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1509","possible_hits":"1",},
{"lineNum":"  162","line":"        },"},
{"lineNum":"  163","line":"    });"},
{"lineNum":"  164","line":"    const b = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1519","possible_hits":"1",},
{"lineNum":"  165","line":"        Type.ClassType.Member{"},
{"lineNum":"  166","line":"            .name = \"a\",","class":"lineCov","hits":"1","order":"1512","possible_hits":"1",},
{"lineNum":"  167","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1511","possible_hits":"1",},
{"lineNum":"  168","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1513","possible_hits":"1",},
{"lineNum":"  169","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1514","possible_hits":"1",},
{"lineNum":"  170","line":"        },"},
{"lineNum":"  171","line":"        Type.ClassType.Member{"},
{"lineNum":"  172","line":"            .name = \"b\",","class":"lineCov","hits":"1","order":"1516","possible_hits":"1",},
{"lineNum":"  173","line":"            .ty = &str,","class":"lineCov","hits":"1","order":"1515","possible_hits":"1",},
{"lineNum":"  174","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1517","possible_hits":"1",},
{"lineNum":"  175","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1518","possible_hits":"1",},
{"lineNum":"  176","line":"        },"},
{"lineNum":"  177","line":"    });"},
{"lineNum":"  178","line":"    const super = Type.newClass(a);","class":"lineCov","hits":"1","order":"1520","possible_hits":"1",},
{"lineNum":"  179","line":"    const c = Type.ClassType.new(&super, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1529","possible_hits":"1",},
{"lineNum":"  180","line":"        Type.ClassType.Member{"},
{"lineNum":"  181","line":"            .name = \"a\",","class":"lineCov","hits":"1","order":"1522","possible_hits":"1",},
{"lineNum":"  182","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1521","possible_hits":"1",},
{"lineNum":"  183","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1523","possible_hits":"1",},
{"lineNum":"  184","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1524","possible_hits":"1",},
{"lineNum":"  185","line":"        },"},
{"lineNum":"  186","line":"        Type.ClassType.Member{"},
{"lineNum":"  187","line":"            .name = \"b\",","class":"lineCov","hits":"1","order":"1526","possible_hits":"1",},
{"lineNum":"  188","line":"            .ty = &str,","class":"lineCov","hits":"1","order":"1525","possible_hits":"1",},
{"lineNum":"  189","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1527","possible_hits":"1",},
{"lineNum":"  190","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1528","possible_hits":"1",},
{"lineNum":"  191","line":"        },"},
{"lineNum":"  192","line":"    });"},
{"lineNum":"  193","line":"    const d = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1538","possible_hits":"1",},
{"lineNum":"  194","line":"        Type.ClassType.Member{"},
{"lineNum":"  195","line":"            .name = \"a\",","class":"lineCov","hits":"1","order":"1531","possible_hits":"1",},
{"lineNum":"  196","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1530","possible_hits":"1",},
{"lineNum":"  197","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1532","possible_hits":"1",},
{"lineNum":"  198","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1533","possible_hits":"1",},
{"lineNum":"  199","line":"        },"},
{"lineNum":"  200","line":"        Type.ClassType.Member{"},
{"lineNum":"  201","line":"            .name = \"b\",","class":"lineCov","hits":"1","order":"1535","possible_hits":"1",},
{"lineNum":"  202","line":"            .ty = &str,","class":"lineCov","hits":"1","order":"1534","possible_hits":"1",},
{"lineNum":"  203","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1536","possible_hits":"1",},
{"lineNum":"  204","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1537","possible_hits":"1",},
{"lineNum":"  205","line":"        },"},
{"lineNum":"  206","line":"    });"},
{"lineNum":"  207","line":"    const e = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1543","possible_hits":"1",},
{"lineNum":"  208","line":"        Type.ClassType.Member{"},
{"lineNum":"  209","line":"            .name = \"a\",","class":"lineCov","hits":"1","order":"1540","possible_hits":"1",},
{"lineNum":"  210","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1539","possible_hits":"1",},
{"lineNum":"  211","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1541","possible_hits":"1",},
{"lineNum":"  212","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1542","possible_hits":"1",},
{"lineNum":"  213","line":"        },"},
{"lineNum":"  214","line":"    });"},
{"lineNum":"  215","line":"    const f = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1552","possible_hits":"1",},
{"lineNum":"  216","line":"        Type.ClassType.Member{"},
{"lineNum":"  217","line":"            .name = \"a\",","class":"lineCov","hits":"1","order":"1545","possible_hits":"1",},
{"lineNum":"  218","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1544","possible_hits":"1",},
{"lineNum":"  219","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1546","possible_hits":"1",},
{"lineNum":"  220","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1547","possible_hits":"1",},
{"lineNum":"  221","line":"        },"},
{"lineNum":"  222","line":"        Type.ClassType.Member{"},
{"lineNum":"  223","line":"            .name = \"b\",","class":"lineCov","hits":"1","order":"1549","possible_hits":"1",},
{"lineNum":"  224","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1548","possible_hits":"1",},
{"lineNum":"  225","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1550","possible_hits":"1",},
{"lineNum":"  226","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1551","possible_hits":"1",},
{"lineNum":"  227","line":"        },"},
{"lineNum":"  228","line":"    });"},
{"lineNum":"  229","line":""},
{"lineNum":"  230","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"1553","possible_hits":"1",},
{"lineNum":"  231","line":"    try std.testing.expectEqual(a.hash(), b.hash());","class":"lineCov","hits":"1","order":"1563","possible_hits":"1",},
{"lineNum":"  232","line":"    try std.testing.expect(a.hash() != c.hash());","class":"lineCov","hits":"1","order":"1564","possible_hits":"1",},
{"lineNum":"  233","line":"    try std.testing.expect(a.hash() != d.hash());","class":"lineCov","hits":"1","order":"1567","possible_hits":"1",},
{"lineNum":"  234","line":"    try std.testing.expect(a.hash() != e.hash());","class":"lineCov","hits":"1","order":"1568","possible_hits":"1",},
{"lineNum":"  235","line":"    try std.testing.expect(a.hash() != f.hash());","class":"lineCov","hits":"1","order":"1569","possible_hits":"1",},
{"lineNum":"  236","line":"}"},
{"lineNum":"  237","line":""},
{"lineNum":"  238","line":"test \"can retrieve ClassType member by name\" {","class":"lineCov","hits":"2","order":"1570","possible_hits":"2",},
{"lineNum":"  239","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1571","possible_hits":"1",},
{"lineNum":"  240","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1572","possible_hits":"1",},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"    const c0 = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1581","possible_hits":"1",},
{"lineNum":"  243","line":"        Type.ClassType.Member{"},
{"lineNum":"  244","line":"            .name = \"a\",","class":"lineCov","hits":"1","order":"1574","possible_hits":"1",},
{"lineNum":"  245","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1573","possible_hits":"1",},
{"lineNum":"  246","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1575","possible_hits":"1",},
{"lineNum":"  247","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1576","possible_hits":"1",},
{"lineNum":"  248","line":"        },"},
{"lineNum":"  249","line":"        Type.ClassType.Member{"},
{"lineNum":"  250","line":"            .name = \"b\",","class":"lineCov","hits":"1","order":"1578","possible_hits":"1",},
{"lineNum":"  251","line":"            .ty = &str,","class":"lineCov","hits":"1","order":"1577","possible_hits":"1",},
{"lineNum":"  252","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1579","possible_hits":"1",},
{"lineNum":"  253","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1580","possible_hits":"1",},
{"lineNum":"  254","line":"        },"},
{"lineNum":"  255","line":"    });"},
{"lineNum":"  256","line":"    const super = Type.newClass(c0);","class":"lineCov","hits":"1","order":"1582","possible_hits":"1",},
{"lineNum":"  257","line":"    const c1 = Type.ClassType.new(&super, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1591","possible_hits":"1",},
{"lineNum":"  258","line":"        Type.ClassType.Member{"},
{"lineNum":"  259","line":"            .name = \"c\",","class":"lineCov","hits":"1","order":"1584","possible_hits":"1",},
{"lineNum":"  260","line":"            .ty = &num,","class":"lineCov","hits":"1","order":"1583","possible_hits":"1",},
{"lineNum":"  261","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1585","possible_hits":"1",},
{"lineNum":"  262","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1586","possible_hits":"1",},
{"lineNum":"  263","line":"        },"},
{"lineNum":"  264","line":"        Type.ClassType.Member{"},
{"lineNum":"  265","line":"            .name = \"d\",","class":"lineCov","hits":"1","order":"1588","possible_hits":"1",},
{"lineNum":"  266","line":"            .ty = &str,","class":"lineCov","hits":"1","order":"1587","possible_hits":"1",},
{"lineNum":"  267","line":"            .visibility = .Public,","class":"lineCov","hits":"1","order":"1589","possible_hits":"1",},
{"lineNum":"  268","line":"            .isReadOnly = false,","class":"lineCov","hits":"1","order":"1590","possible_hits":"1",},
{"lineNum":"  269","line":"        },"},
{"lineNum":"  270","line":"    });"},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"    const a = c0.getNamedMember(\"a\");","class":"lineCov","hits":"1","order":"1592","possible_hits":"1",},
{"lineNum":"  273","line":"    try std.testing.expect(a != null);","class":"lineCov","hits":"1","order":"1597","possible_hits":"1",},
{"lineNum":"  274","line":"    try std.testing.expectEqualStrings(\"a\", a.?.name);","class":"linePartCov","hits":"1","order":"1598","possible_hits":"2",},
{"lineNum":"  275","line":"    try std.testing.expectEqual(Type.Type.Number, a.?.ty.getType());","class":"linePartCov","hits":"1","order":"1599","possible_hits":"2",},
{"lineNum":"  276","line":""},
{"lineNum":"  277","line":"    const b = c1.getNamedMember(\"b\");","class":"lineCov","hits":"1","order":"1600","possible_hits":"1",},
{"lineNum":"  278","line":"    try std.testing.expect(b != null);","class":"lineCov","hits":"1","order":"1603","possible_hits":"1",},
{"lineNum":"  279","line":"    try std.testing.expectEqualStrings(\"b\", b.?.name);","class":"linePartCov","hits":"1","order":"1604","possible_hits":"2",},
{"lineNum":"  280","line":"    try std.testing.expectEqual(Type.Type.String, b.?.ty.getType());","class":"linePartCov","hits":"1","order":"1605","possible_hits":"2",},
{"lineNum":"  281","line":""},
{"lineNum":"  282","line":"    const c = c0.getNamedMember(\"c\");","class":"lineCov","hits":"1","order":"1606","possible_hits":"1",},
{"lineNum":"  283","line":"    try std.testing.expect(c == null);","class":"lineCov","hits":"1","order":"1608","possible_hits":"1",},
{"lineNum":"  284","line":"}"},
{"lineNum":"  285","line":""},
{"lineNum":"  286","line":"test \"can detect if a class is a subclass of another class\" {","class":"lineCov","hits":"2","order":"1609","possible_hits":"2",},
{"lineNum":"  287","line":"    const c0 = Type.newClass(","class":"lineCov","hits":"1","order":"1611","possible_hits":"1",},
{"lineNum":"  288","line":"        Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1610","possible_hits":"1",},
{"lineNum":"  289","line":"    );"},
{"lineNum":"  290","line":"    const c1 = Type.newClass(","class":"lineCov","hits":"1","order":"1613","possible_hits":"1",},
{"lineNum":"  291","line":"        Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1612","possible_hits":"1",},
{"lineNum":"  292","line":"    );"},
{"lineNum":"  293","line":"    const c2 = Type.newClass(","class":"lineCov","hits":"1","order":"1615","possible_hits":"1",},
{"lineNum":"  294","line":"        Type.ClassType.new(&c0, \"C\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1614","possible_hits":"1",},
{"lineNum":"  295","line":"    );"},
{"lineNum":"  296","line":"    const c3 = Type.newClass(","class":"lineCov","hits":"1","order":"1617","possible_hits":"1",},
{"lineNum":"  297","line":"        Type.ClassType.new(&c2, \"D\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1616","possible_hits":"1",},
{"lineNum":"  298","line":"    );"},
{"lineNum":"  299","line":""},
{"lineNum":"  300","line":"    try std.testing.expect(!c0.Class.isSubclassOf(&c1));","class":"lineCov","hits":"2","order":"1618","possible_hits":"2",},
{"lineNum":"  301","line":"    try std.testing.expect(!c1.Class.isSubclassOf(&c0));","class":"lineCov","hits":"2","order":"1624","possible_hits":"2",},
{"lineNum":"  302","line":"    try std.testing.expect(!c0.Class.isSubclassOf(&c2));","class":"lineCov","hits":"2","order":"1625","possible_hits":"2",},
{"lineNum":"  303","line":"    try std.testing.expect(c2.Class.isSubclassOf(&c0));","class":"lineCov","hits":"2","order":"1626","possible_hits":"2",},
{"lineNum":"  304","line":"    try std.testing.expect(!c0.Class.isSubclassOf(&c3));","class":"lineCov","hits":"2","order":"1630","possible_hits":"2",},
{"lineNum":"  305","line":"    try std.testing.expect(c3.Class.isSubclassOf(&c2));","class":"lineCov","hits":"2","order":"1631","possible_hits":"2",},
{"lineNum":"  306","line":"    try std.testing.expect(c3.Class.isSubclassOf(&c0));","class":"lineCov","hits":"2","order":"1632","possible_hits":"2",},
{"lineNum":"  307","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:59:30", "instrumented" : 173, "covered" : 172,};
var merged_data = [];
