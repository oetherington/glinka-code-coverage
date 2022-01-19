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
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"pub const InterfaceType = struct {"},
{"lineNum":"   23","line":"    pub const Member = struct {"},
{"lineNum":"   24","line":"        name: []const u8,"},
{"lineNum":"   25","line":"        ty: Type.Ptr,"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"        pub fn eql(a: Member, b: Member) bool {","class":"lineCov","hits":"1","order":"2199","possible_hits":"1",},
{"lineNum":"   28","line":"            return genericEql(a, b);","class":"lineCov","hits":"1","order":"2200","possible_hits":"1",},
{"lineNum":"   29","line":"        }"},
{"lineNum":"   30","line":"    };"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    members: []Member,"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn new(members: []Member) InterfaceType {","class":"lineCov","hits":"1","order":"330","possible_hits":"1",},
{"lineNum":"   35","line":"        return InterfaceType{","class":"lineCov","hits":"1","order":"332","possible_hits":"1",},
{"lineNum":"   36","line":"            .members = members,","class":"lineCov","hits":"1","order":"331","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn hash(self: InterfaceType) usize {","class":"lineCov","hits":"1","order":"335","possible_hits":"1",},
{"lineNum":"   41","line":"        var result: usize = 0xe75f7630fbf1ff65;","class":"lineCov","hits":"1","order":"336","possible_hits":"1",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        for (self.members) |mem|","class":"lineCov","hits":"2","order":"337","possible_hits":"2",},
{"lineNum":"   44","line":"            result ^= std.hash.Wyhash.hash(0, mem.name) ^ @ptrToInt(mem.ty);","class":"lineCov","hits":"1","order":"338","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"        return result;","class":"lineCov","hits":"1","order":"339","possible_hits":"1",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    pub fn write(self: InterfaceType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2036","possible_hits":"4",},
{"lineNum":"   50","line":"        try writer.print(\"{{ \", .{});","class":"linePartCov","hits":"1","order":"2037","possible_hits":"2",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"        for (self.members) |mem| {","class":"linePartCov","hits":"2","order":"2038","possible_hits":"4",},
{"lineNum":"   53","line":"            try writer.print(\"{s}: \", .{mem.name});","class":"linePartCov","hits":"1","order":"2039","possible_hits":"2",},
{"lineNum":"   54","line":"            try mem.ty.write(writer);","class":"linePartCov","hits":"1","order":"2040","possible_hits":"2",},
{"lineNum":"   55","line":"            try writer.print(\", \", .{});","class":"linePartCov","hits":"1","order":"2041","possible_hits":"2",},
{"lineNum":"   56","line":"        }"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"        try writer.print(\"}}\", .{});","class":"linePartCov","hits":"1","order":"2042","possible_hits":"2",},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    pub fn getNamedMember(","class":"lineCov","hits":"1","order":"2227","possible_hits":"1",},
{"lineNum":"   62","line":"        self: InterfaceType,"},
{"lineNum":"   63","line":"        name: []const u8,"},
{"lineNum":"   64","line":"    ) ?Member {"},
{"lineNum":"   65","line":"        for (self.members) |member|","class":"lineCov","hits":"2","order":"2228","possible_hits":"2",},
{"lineNum":"   66","line":"            if (std.mem.eql(u8, member.name, name))","class":"lineCov","hits":"2","order":"2229","possible_hits":"2",},
{"lineNum":"   67","line":"                return member;","class":"lineCov","hits":"1","order":"2230","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"        return null;","class":"lineCov","hits":"1","order":"2239","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    pub fn isAssignableTo(self: InterfaceType, target: InterfaceType) bool {","class":"lineCov","hits":"1","order":"2256","possible_hits":"1",},
{"lineNum":"   73","line":"        for (target.members) |member| {","class":"lineCov","hits":"2","order":"2257","possible_hits":"2",},
{"lineNum":"   74","line":"            const local = self.getNamedMember(member.name);","class":"lineCov","hits":"1","order":"2258","possible_hits":"1",},
{"lineNum":"   75","line":"            if (local) |local_| {","class":"lineCov","hits":"2","order":"2259","possible_hits":"2",},
{"lineNum":"   76","line":"                if (!local_.ty.isAssignableTo(member.ty))","class":"lineCov","hits":"2","order":"2260","possible_hits":"2",},
{"lineNum":"   77","line":"                    return false;","class":"lineCov","hits":"1","order":"2269","possible_hits":"1",},
{"lineNum":"   78","line":"            } else {"},
{"lineNum":"   79","line":"                return false;","class":"lineCov","hits":"1","order":"2263","possible_hits":"1",},
{"lineNum":"   80","line":"            }"},
{"lineNum":"   81","line":"        }"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"        return true;","class":"lineCov","hits":"1","order":"2261","possible_hits":"1",},
{"lineNum":"   84","line":"    }"},
{"lineNum":"   85","line":"};"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"test \"can check InterfaceType.Member equality\" {","class":"lineCov","hits":"2","order":"2191","possible_hits":"2",},
{"lineNum":"   88","line":"    const number = Type.newNumber();","class":"lineCov","hits":"1","order":"2192","possible_hits":"1",},
{"lineNum":"   89","line":"    const boolean = Type.newBoolean();","class":"lineCov","hits":"1","order":"2193","possible_hits":"1",},
{"lineNum":"   90","line":"    const a = InterfaceType.Member{ .name = \"a\", .ty = &number };","class":"lineCov","hits":"1","order":"2194","possible_hits":"1",},
{"lineNum":"   91","line":"    const b = InterfaceType.Member{ .name = \"a\", .ty = &number };","class":"lineCov","hits":"1","order":"2195","possible_hits":"1",},
{"lineNum":"   92","line":"    const c = InterfaceType.Member{ .name = \"b\", .ty = &number };","class":"lineCov","hits":"1","order":"2196","possible_hits":"1",},
{"lineNum":"   93","line":"    const d = InterfaceType.Member{ .name = \"a\", .ty = &boolean };","class":"lineCov","hits":"1","order":"2197","possible_hits":"1",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    try std.testing.expect(a.eql(a));","class":"lineCov","hits":"1","order":"2198","possible_hits":"1",},
{"lineNum":"   96","line":"    try std.testing.expect(a.eql(b));","class":"lineCov","hits":"1","order":"2201","possible_hits":"1",},
{"lineNum":"   97","line":"    try std.testing.expect(!a.eql(c));","class":"lineCov","hits":"1","order":"2202","possible_hits":"1",},
{"lineNum":"   98","line":"    try std.testing.expect(!a.eql(d));","class":"lineCov","hits":"1","order":"2203","possible_hits":"1",},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"test \"can hash an InterfaceType\" {","class":"lineCov","hits":"2","order":"2204","possible_hits":"2",},
{"lineNum":"  102","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"2205","possible_hits":"1",},
{"lineNum":"  103","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"2206","possible_hits":"1",},
{"lineNum":"  104","line":"    const never = Type.newNever();","class":"lineCov","hits":"1","order":"2207","possible_hits":"1",},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    const a = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"2210","possible_hits":"1",},
{"lineNum":"  107","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"2208","possible_hits":"1",},
{"lineNum":"  108","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"2209","possible_hits":"1",},
{"lineNum":"  109","line":"    });"},
{"lineNum":"  110","line":"    const b = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"2213","possible_hits":"1",},
{"lineNum":"  111","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"2211","possible_hits":"1",},
{"lineNum":"  112","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"2212","possible_hits":"1",},
{"lineNum":"  113","line":"    });"},
{"lineNum":"  114","line":"    const c = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"2216","possible_hits":"1",},
{"lineNum":"  115","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"2214","possible_hits":"1",},
{"lineNum":"  116","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &never },","class":"lineCov","hits":"1","order":"2215","possible_hits":"1",},
{"lineNum":"  117","line":"    });"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"2217","possible_hits":"1",},
{"lineNum":"  120","line":"    try std.testing.expectEqual(a.hash(), b.hash());","class":"lineCov","hits":"1","order":"2218","possible_hits":"1",},
{"lineNum":"  121","line":"    try std.testing.expect(a.hash() != c.hash());","class":"lineCov","hits":"1","order":"2219","possible_hits":"1",},
{"lineNum":"  122","line":"}"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"test \"can retrieve InterfaceType member by name\" {","class":"lineCov","hits":"2","order":"2220","possible_hits":"2",},
{"lineNum":"  125","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"2221","possible_hits":"1",},
{"lineNum":"  126","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"2222","possible_hits":"1",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    const in = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"2225","possible_hits":"1",},
{"lineNum":"  129","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"2223","possible_hits":"1",},
{"lineNum":"  130","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"2224","possible_hits":"1",},
{"lineNum":"  131","line":"    });"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    const a = in.getNamedMember(\"a\");","class":"lineCov","hits":"1","order":"2226","possible_hits":"1",},
{"lineNum":"  134","line":"    try std.testing.expect(a != null);","class":"lineCov","hits":"1","order":"2231","possible_hits":"1",},
{"lineNum":"  135","line":"    try std.testing.expectEqualStrings(\"a\", a.?.name);","class":"linePartCov","hits":"1","order":"2232","possible_hits":"2",},
{"lineNum":"  136","line":"    try std.testing.expectEqual(Type.Type.Number, a.?.ty.getType());","class":"linePartCov","hits":"1","order":"2233","possible_hits":"2",},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    const b = in.getNamedMember(\"b\");","class":"lineCov","hits":"1","order":"2234","possible_hits":"1",},
{"lineNum":"  139","line":"    try std.testing.expect(b != null);","class":"lineCov","hits":"1","order":"2235","possible_hits":"1",},
{"lineNum":"  140","line":"    try std.testing.expectEqualStrings(\"b\", b.?.name);","class":"linePartCov","hits":"1","order":"2236","possible_hits":"2",},
{"lineNum":"  141","line":"    try std.testing.expectEqual(Type.Type.String, b.?.ty.getType());","class":"linePartCov","hits":"1","order":"2237","possible_hits":"2",},
{"lineNum":"  142","line":""},
{"lineNum":"  143","line":"    const c = in.getNamedMember(\"c\");","class":"lineCov","hits":"1","order":"2238","possible_hits":"1",},
{"lineNum":"  144","line":"    try std.testing.expect(c == null);","class":"lineCov","hits":"1","order":"2240","possible_hits":"1",},
{"lineNum":"  145","line":"}"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"test \"can check if interface assignablility\" {","class":"lineCov","hits":"2","order":"2241","possible_hits":"2",},
{"lineNum":"  148","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"2242","possible_hits":"1",},
{"lineNum":"  149","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"2243","possible_hits":"1",},
{"lineNum":"  150","line":"    const any = Type.newAny();","class":"lineCov","hits":"1","order":"2244","possible_hits":"1",},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"    const a = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"2247","possible_hits":"1",},
{"lineNum":"  153","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"2245","possible_hits":"1",},
{"lineNum":"  154","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"2246","possible_hits":"1",},
{"lineNum":"  155","line":"    });"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"    const b = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"2251","possible_hits":"1",},
{"lineNum":"  158","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"2248","possible_hits":"1",},
{"lineNum":"  159","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"2249","possible_hits":"1",},
{"lineNum":"  160","line":"        Type.InterfaceType.Member{ .name = \"c\", .ty = &any },","class":"lineCov","hits":"1","order":"2250","possible_hits":"1",},
{"lineNum":"  161","line":"    });"},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    const c = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"2254","possible_hits":"1",},
{"lineNum":"  164","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &any },","class":"lineCov","hits":"1","order":"2252","possible_hits":"1",},
{"lineNum":"  165","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"2253","possible_hits":"1",},
{"lineNum":"  166","line":"    });"},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    try std.testing.expect(a.isAssignableTo(a));","class":"lineCov","hits":"1","order":"2255","possible_hits":"1",},
{"lineNum":"  169","line":"    try std.testing.expect(!a.isAssignableTo(b));","class":"lineCov","hits":"1","order":"2262","possible_hits":"1",},
{"lineNum":"  170","line":"    try std.testing.expect(a.isAssignableTo(c));","class":"lineCov","hits":"1","order":"2264","possible_hits":"1",},
{"lineNum":"  171","line":"    try std.testing.expect(b.isAssignableTo(a));","class":"lineCov","hits":"1","order":"2265","possible_hits":"1",},
{"lineNum":"  172","line":"    try std.testing.expect(b.isAssignableTo(b));","class":"lineCov","hits":"1","order":"2266","possible_hits":"1",},
{"lineNum":"  173","line":"    try std.testing.expect(b.isAssignableTo(c));","class":"lineCov","hits":"1","order":"2267","possible_hits":"1",},
{"lineNum":"  174","line":"    try std.testing.expect(!c.isAssignableTo(a));","class":"lineCov","hits":"1","order":"2268","possible_hits":"1",},
{"lineNum":"  175","line":"    try std.testing.expect(!c.isAssignableTo(b));","class":"lineCov","hits":"1","order":"2270","possible_hits":"1",},
{"lineNum":"  176","line":"    try std.testing.expect(c.isAssignableTo(c));","class":"lineCov","hits":"1","order":"2271","possible_hits":"1",},
{"lineNum":"  177","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:06:17", "instrumented" : 96, "covered" : 96,};
var merged_data = [];
