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
{"lineNum":"   25","line":"        // TODO: static, readonly, initialization values"},
{"lineNum":"   26","line":"        name: []const u8,"},
{"lineNum":"   27","line":"        ty: Type.Ptr,"},
{"lineNum":"   28","line":"        visibility: Visibility,"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"        pub fn eql(a: Member, b: Member) bool {","class":"lineCov","hits":"1","order":"1479","possible_hits":"1",},
{"lineNum":"   31","line":"            return genericEql(a, b);","class":"lineCov","hits":"1","order":"1480","possible_hits":"1",},
{"lineNum":"   32","line":"        }"},
{"lineNum":"   33","line":"    };"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    super: ?Type.Ptr,"},
{"lineNum":"   36","line":"    name: []const u8,"},
{"lineNum":"   37","line":"    members: []Member,"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn new(","class":"lineCov","hits":"1","order":"1385","possible_hits":"1",},
{"lineNum":"   40","line":"        super: ?Type.Ptr,"},
{"lineNum":"   41","line":"        name: []const u8,"},
{"lineNum":"   42","line":"        members: []Member,"},
{"lineNum":"   43","line":"    ) ClassType {"},
{"lineNum":"   44","line":"        std.debug.assert(super == null or super.?.getType() == .Class);","class":"linePartCov","hits":"1","order":"1386","possible_hits":"2",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"        return ClassType{","class":"lineCov","hits":"1","order":"1390","possible_hits":"1",},
{"lineNum":"   47","line":"            .super = super,","class":"lineCov","hits":"1","order":"1387","possible_hits":"1",},
{"lineNum":"   48","line":"            .name = name,","class":"lineCov","hits":"1","order":"1388","possible_hits":"1",},
{"lineNum":"   49","line":"            .members = members,","class":"lineCov","hits":"1","order":"1389","possible_hits":"1",},
{"lineNum":"   50","line":"        };"},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    pub fn hash(self: ClassType) usize {","class":"lineCov","hits":"1","order":"1507","possible_hits":"1",},
{"lineNum":"   54","line":"        var result: usize = if (self.super) |super|","class":"lineCov","hits":"2","order":"1508","possible_hits":"2",},
{"lineNum":"   55","line":"            super.hash()","class":"lineCov","hits":"1","order":"1518","possible_hits":"1",},
{"lineNum":"   56","line":"        else"},
{"lineNum":"   57","line":"            0x0e28e786568bc7a6;","class":"lineCov","hits":"1","order":"1509","possible_hits":"1",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"        result ^= std.hash.Wyhash.hash(0, self.name);","class":"lineCov","hits":"1","order":"1510","possible_hits":"1",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"        for (self.members) |mem| {","class":"lineCov","hits":"2","order":"1511","possible_hits":"2",},
{"lineNum":"   62","line":"            result ^= std.hash.Wyhash.hash(0, mem.name);","class":"lineCov","hits":"1","order":"1512","possible_hits":"1",},
{"lineNum":"   63","line":"            result ^= @ptrToInt(mem.ty);","class":"lineCov","hits":"1","order":"1513","possible_hits":"1",},
{"lineNum":"   64","line":"            result += @enumToInt(mem.visibility);","class":"linePartCov","hits":"1","order":"1514","possible_hits":"2",},
{"lineNum":"   65","line":"        }"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"        return result;","class":"lineCov","hits":"1","order":"1515","possible_hits":"1",},
{"lineNum":"   68","line":"    }"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    pub fn write(self: ClassType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1396","possible_hits":"4",},
{"lineNum":"   71","line":"        try writer.print(\"class {s}\", .{self.name});","class":"linePartCov","hits":"1","order":"1397","possible_hits":"2",},
{"lineNum":"   72","line":"    }"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    pub fn getNamedMember(","class":"lineCov","hits":"1","order":"1534","possible_hits":"1",},
{"lineNum":"   75","line":"        self: ClassType,"},
{"lineNum":"   76","line":"        name: []const u8,"},
{"lineNum":"   77","line":"    ) ?Member {"},
{"lineNum":"   78","line":"        for (self.members) |member|","class":"lineCov","hits":"2","order":"1535","possible_hits":"2",},
{"lineNum":"   79","line":"            if (std.mem.eql(u8, member.name, name))","class":"lineCov","hits":"2","order":"1536","possible_hits":"2",},
{"lineNum":"   80","line":"                return member;","class":"lineCov","hits":"1","order":"1537","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"        if (self.super) |super|","class":"lineCov","hits":"2","order":"1542","possible_hits":"2",},
{"lineNum":"   83","line":"            return super.Class.getNamedMember(name);","class":"lineCov","hits":"2","order":"1543","possible_hits":"2",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"        return null;","class":"lineCov","hits":"1","order":"1548","possible_hits":"1",},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    pub fn isSubclassOf(self: ClassType, super: Type.Ptr) bool {","class":"lineCov","hits":"1","order":"1560","possible_hits":"1",},
{"lineNum":"   89","line":"        if (super.getType() != .Class)","class":"lineCov","hits":"2","order":"1561","possible_hits":"2",},
{"lineNum":"   90","line":"            return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"        var s = self.super;","class":"lineCov","hits":"1","order":"1562","possible_hits":"1",},
{"lineNum":"   93","line":"        while (s) |ss| {","class":"lineCov","hits":"2","order":"1563","possible_hits":"2",},
{"lineNum":"   94","line":"            std.debug.assert(ss.getType() == .Class);","class":"lineCov","hits":"1","order":"1568","possible_hits":"1",},
{"lineNum":"   95","line":"            if (super == ss)","class":"lineCov","hits":"2","order":"1569","possible_hits":"2",},
{"lineNum":"   96","line":"                return true;","class":"lineCov","hits":"1","order":"1570","possible_hits":"1",},
{"lineNum":"   97","line":"            s = ss.Class.super;","class":"linePartCov","hits":"2","order":"1574","possible_hits":"3",},
{"lineNum":"   98","line":"        }"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"        return false;","class":"lineCov","hits":"1","order":"1564","possible_hits":"1",},
{"lineNum":"  101","line":"    }"},
{"lineNum":"  102","line":"};"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"test \"can check ClassType.Member equality\" {","class":"lineCov","hits":"2","order":"1460","possible_hits":"2",},
{"lineNum":"  105","line":"    const number = Type.newNumber();","class":"lineCov","hits":"1","order":"1461","possible_hits":"1",},
{"lineNum":"  106","line":"    const boolean = Type.newBoolean();","class":"lineCov","hits":"1","order":"1462","possible_hits":"1",},
{"lineNum":"  107","line":"    const a = ClassType.Member{"},
{"lineNum":"  108","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1464","possible_hits":"1",},
{"lineNum":"  109","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1463","possible_hits":"1",},
{"lineNum":"  110","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1465","possible_hits":"1",},
{"lineNum":"  111","line":"    };"},
{"lineNum":"  112","line":"    const b = ClassType.Member{"},
{"lineNum":"  113","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1467","possible_hits":"1",},
{"lineNum":"  114","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1466","possible_hits":"1",},
{"lineNum":"  115","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1468","possible_hits":"1",},
{"lineNum":"  116","line":"    };"},
{"lineNum":"  117","line":"    const c = ClassType.Member{"},
{"lineNum":"  118","line":"        .name = \"b\",","class":"lineCov","hits":"1","order":"1470","possible_hits":"1",},
{"lineNum":"  119","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1469","possible_hits":"1",},
{"lineNum":"  120","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1471","possible_hits":"1",},
{"lineNum":"  121","line":"    };"},
{"lineNum":"  122","line":"    const d = ClassType.Member{"},
{"lineNum":"  123","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1473","possible_hits":"1",},
{"lineNum":"  124","line":"        .ty = &boolean,","class":"lineCov","hits":"1","order":"1472","possible_hits":"1",},
{"lineNum":"  125","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"1474","possible_hits":"1",},
{"lineNum":"  126","line":"    };"},
{"lineNum":"  127","line":"    const e = ClassType.Member{"},
{"lineNum":"  128","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"1476","possible_hits":"1",},
{"lineNum":"  129","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"1475","possible_hits":"1",},
{"lineNum":"  130","line":"        .visibility = .Protected,","class":"lineCov","hits":"1","order":"1477","possible_hits":"1",},
{"lineNum":"  131","line":"    };"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    try std.testing.expect(a.eql(a));","class":"lineCov","hits":"1","order":"1478","possible_hits":"1",},
{"lineNum":"  134","line":"    try std.testing.expect(a.eql(b));","class":"lineCov","hits":"1","order":"1481","possible_hits":"1",},
{"lineNum":"  135","line":"    try std.testing.expect(!a.eql(c));","class":"lineCov","hits":"1","order":"1482","possible_hits":"1",},
{"lineNum":"  136","line":"    try std.testing.expect(!a.eql(d));","class":"lineCov","hits":"1","order":"1483","possible_hits":"1",},
{"lineNum":"  137","line":"    try std.testing.expect(!a.eql(e));","class":"lineCov","hits":"1","order":"1484","possible_hits":"1",},
{"lineNum":"  138","line":"}"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"test \"can hash a ClassType\" {","class":"lineCov","hits":"2","order":"1485","possible_hits":"2",},
{"lineNum":"  141","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1486","possible_hits":"1",},
{"lineNum":"  142","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1487","possible_hits":"1",},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"    const a = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1490","possible_hits":"1",},
{"lineNum":"  145","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1488","possible_hits":"1",},
{"lineNum":"  146","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"1489","possible_hits":"1",},
{"lineNum":"  147","line":"    });"},
{"lineNum":"  148","line":"    const b = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1493","possible_hits":"1",},
{"lineNum":"  149","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1491","possible_hits":"1",},
{"lineNum":"  150","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"1492","possible_hits":"1",},
{"lineNum":"  151","line":"    });"},
{"lineNum":"  152","line":"    const super = Type.newClass(a);","class":"lineCov","hits":"1","order":"1494","possible_hits":"1",},
{"lineNum":"  153","line":"    const c = Type.ClassType.new(&super, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1497","possible_hits":"1",},
{"lineNum":"  154","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1495","possible_hits":"1",},
{"lineNum":"  155","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"1496","possible_hits":"1",},
{"lineNum":"  156","line":"    });"},
{"lineNum":"  157","line":"    const d = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1500","possible_hits":"1",},
{"lineNum":"  158","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1498","possible_hits":"1",},
{"lineNum":"  159","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"1499","possible_hits":"1",},
{"lineNum":"  160","line":"    });"},
{"lineNum":"  161","line":"    const e = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1502","possible_hits":"1",},
{"lineNum":"  162","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1501","possible_hits":"1",},
{"lineNum":"  163","line":"    });"},
{"lineNum":"  164","line":"    const f = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1505","possible_hits":"1",},
{"lineNum":"  165","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1503","possible_hits":"1",},
{"lineNum":"  166","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1504","possible_hits":"1",},
{"lineNum":"  167","line":"    });"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"1506","possible_hits":"1",},
{"lineNum":"  170","line":"    try std.testing.expectEqual(a.hash(), b.hash());","class":"lineCov","hits":"1","order":"1516","possible_hits":"1",},
{"lineNum":"  171","line":"    try std.testing.expect(a.hash() != c.hash());","class":"lineCov","hits":"1","order":"1517","possible_hits":"1",},
{"lineNum":"  172","line":"    try std.testing.expect(a.hash() != d.hash());","class":"lineCov","hits":"1","order":"1520","possible_hits":"1",},
{"lineNum":"  173","line":"    try std.testing.expect(a.hash() != e.hash());","class":"lineCov","hits":"1","order":"1521","possible_hits":"1",},
{"lineNum":"  174","line":"    try std.testing.expect(a.hash() != f.hash());","class":"lineCov","hits":"1","order":"1522","possible_hits":"1",},
{"lineNum":"  175","line":"}"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"test \"can retrieve ClassType member by name\" {","class":"lineCov","hits":"2","order":"1523","possible_hits":"2",},
{"lineNum":"  178","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1524","possible_hits":"1",},
{"lineNum":"  179","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1525","possible_hits":"1",},
{"lineNum":"  180","line":""},
{"lineNum":"  181","line":"    const c0 = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1528","possible_hits":"1",},
{"lineNum":"  182","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1526","possible_hits":"1",},
{"lineNum":"  183","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"1527","possible_hits":"1",},
{"lineNum":"  184","line":"    });"},
{"lineNum":"  185","line":"    const super = Type.newClass(c0);","class":"lineCov","hits":"1","order":"1529","possible_hits":"1",},
{"lineNum":"  186","line":"    const c1 = Type.ClassType.new(&super, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"1532","possible_hits":"1",},
{"lineNum":"  187","line":"        Type.ClassType.Member{ .name = \"c\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"1530","possible_hits":"1",},
{"lineNum":"  188","line":"        Type.ClassType.Member{ .name = \"d\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"1531","possible_hits":"1",},
{"lineNum":"  189","line":"    });"},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"    const a = c0.getNamedMember(\"a\");","class":"lineCov","hits":"1","order":"1533","possible_hits":"1",},
{"lineNum":"  192","line":"    try std.testing.expect(a != null);","class":"lineCov","hits":"1","order":"1538","possible_hits":"1",},
{"lineNum":"  193","line":"    try std.testing.expectEqualStrings(\"a\", a.?.name);","class":"linePartCov","hits":"1","order":"1539","possible_hits":"2",},
{"lineNum":"  194","line":"    try std.testing.expectEqual(Type.Type.Number, a.?.ty.getType());","class":"linePartCov","hits":"1","order":"1540","possible_hits":"2",},
{"lineNum":"  195","line":""},
{"lineNum":"  196","line":"    const b = c1.getNamedMember(\"b\");","class":"lineCov","hits":"1","order":"1541","possible_hits":"1",},
{"lineNum":"  197","line":"    try std.testing.expect(b != null);","class":"lineCov","hits":"1","order":"1544","possible_hits":"1",},
{"lineNum":"  198","line":"    try std.testing.expectEqualStrings(\"b\", b.?.name);","class":"linePartCov","hits":"1","order":"1545","possible_hits":"2",},
{"lineNum":"  199","line":"    try std.testing.expectEqual(Type.Type.String, b.?.ty.getType());","class":"linePartCov","hits":"1","order":"1546","possible_hits":"2",},
{"lineNum":"  200","line":""},
{"lineNum":"  201","line":"    const c = c0.getNamedMember(\"c\");","class":"lineCov","hits":"1","order":"1547","possible_hits":"1",},
{"lineNum":"  202","line":"    try std.testing.expect(c == null);","class":"lineCov","hits":"1","order":"1549","possible_hits":"1",},
{"lineNum":"  203","line":"}"},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"test \"can detect if a class is a subclass of another class\" {","class":"lineCov","hits":"2","order":"1550","possible_hits":"2",},
{"lineNum":"  206","line":"    const c0 = Type.newClass(","class":"lineCov","hits":"1","order":"1552","possible_hits":"1",},
{"lineNum":"  207","line":"        Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1551","possible_hits":"1",},
{"lineNum":"  208","line":"    );"},
{"lineNum":"  209","line":"    const c1 = Type.newClass(","class":"lineCov","hits":"1","order":"1554","possible_hits":"1",},
{"lineNum":"  210","line":"        Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1553","possible_hits":"1",},
{"lineNum":"  211","line":"    );"},
{"lineNum":"  212","line":"    const c2 = Type.newClass(","class":"lineCov","hits":"1","order":"1556","possible_hits":"1",},
{"lineNum":"  213","line":"        Type.ClassType.new(&c0, \"C\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1555","possible_hits":"1",},
{"lineNum":"  214","line":"    );"},
{"lineNum":"  215","line":"    const c3 = Type.newClass(","class":"lineCov","hits":"1","order":"1558","possible_hits":"1",},
{"lineNum":"  216","line":"        Type.ClassType.new(&c2, \"D\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"1557","possible_hits":"1",},
{"lineNum":"  217","line":"    );"},
{"lineNum":"  218","line":""},
{"lineNum":"  219","line":"    try std.testing.expect(!c0.Class.isSubclassOf(&c1));","class":"lineCov","hits":"2","order":"1559","possible_hits":"2",},
{"lineNum":"  220","line":"    try std.testing.expect(!c1.Class.isSubclassOf(&c0));","class":"lineCov","hits":"2","order":"1565","possible_hits":"2",},
{"lineNum":"  221","line":"    try std.testing.expect(!c0.Class.isSubclassOf(&c2));","class":"lineCov","hits":"2","order":"1566","possible_hits":"2",},
{"lineNum":"  222","line":"    try std.testing.expect(c2.Class.isSubclassOf(&c0));","class":"lineCov","hits":"2","order":"1567","possible_hits":"2",},
{"lineNum":"  223","line":"    try std.testing.expect(!c0.Class.isSubclassOf(&c3));","class":"lineCov","hits":"2","order":"1571","possible_hits":"2",},
{"lineNum":"  224","line":"    try std.testing.expect(c3.Class.isSubclassOf(&c2));","class":"lineCov","hits":"2","order":"1572","possible_hits":"2",},
{"lineNum":"  225","line":"    try std.testing.expect(c3.Class.isSubclassOf(&c0));","class":"lineCov","hits":"2","order":"1573","possible_hits":"2",},
{"lineNum":"  226","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:34:54", "instrumented" : 123, "covered" : 122,};
var merged_data = [];
